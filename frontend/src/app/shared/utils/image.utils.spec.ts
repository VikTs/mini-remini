import { ImageUtils } from "./image.utils"

describe('imageUtils', () => {
    describe('validateImageFile', () => {
        it("should return false if file is undefined", () => {
            expect(ImageUtils.validateImageFile(undefined)).toBeFalse();
        });
        it("should return false for non-image file", () => {
            const fileMock = new File([''], 'text.txt', { type: "text/plain" });
            expect(ImageUtils.validateImageFile(fileMock)).toBeFalse();
        });
        it("should return false for image file", () => {
            const fileMock = new File([''], 'image.jpg', { type: "image/jpg" });
            expect(ImageUtils.validateImageFile(fileMock)).toBeTrue();
        })
    });
    describe('getImageDimensions', () => {
        let originalImage: typeof Image;

        beforeEach(() => {
            originalImage = window.Image;
        });

        afterEach(() => {
            window.Image = originalImage;
        });

        it("should emit width and height on sucessful image load", (done) => {
            const mockBase64 = "data:image/png";

            const imageMock = {
                src: "",
                width: 100,
                height: 200,
                onload: null as any,
                onerror: null as any
            };

            (window as any).Image = function () {
                return imageMock;
            }

            ImageUtils.getImageDimensions(mockBase64).subscribe({
                next: ({ width, height }) => {
                    expect(width).toBe(100);
                    expect(height).toBe(200);
                    done();
                },
                error: () => {
                    fail("Should not emit error");
                    done();
                }
            });

            imageMock.onload();
        });

        it("should emit error on image load failure", (done) => {
            const mockBase64 = "data:image/png";

            const imageMock = {
                src: "",
                width: 0,
                height: 0,
                onload: null as any,
                onerror: null as any
            };

            (window as any).Image = function () {
                return imageMock;
            }

            ImageUtils.getImageDimensions(mockBase64).subscribe({
                next: ({ width, height }) => {
                    fail("Should not emit success");
                    done();
                },
                error: (error) => {
                    expect(error).toBe("Failed to load image from Base64 string.");
                    done();
                }
            });

            imageMock.onerror();
        });
    });

    describe('convertFileToBase64', () => {
        let fileReaderMock: typeof FileReader;

        beforeEach(() => {
            fileReaderMock = window.FileReader;
        });
        afterEach(() => {
            window.FileReader = fileReaderMock;
        });

        it("should onload", (done) => {
            const fileMock = new File([''], 'img.png', { type: "image/png" });
            const mockResult = "data:image/png;base64,dHVtbXk=";

            const mockReader = {
                result: mockResult,
                readAsDataURL: jasmine.createSpy("readAsDataURL"),
            } as unknown as FileReader;

            (window as any).FileReader = function () {
                return mockReader;
            }

            ImageUtils.convertFileToBase64(fileMock).subscribe({
                next: (result) => {
                    expect(result).toBe(mockResult);
                    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(fileMock);
                    done();
                },
                error: (error) => {
                    fail("Should not error");
                    done();
                }
            });

            (mockReader.onload as Function)({ target: { result: mockResult } })
        });
    })
})
