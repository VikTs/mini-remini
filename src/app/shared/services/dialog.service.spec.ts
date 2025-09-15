import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, DialogService } from './dialog.service';
import { DialogComponent } from '../components/dialog/dialog.component';

describe('DialogService', () => {
    let service: DialogService;
    let matDialogMock: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        matDialogMock = jasmine.createSpyObj("MatDialog", ["open"]);

        await TestBed.configureTestingModule({
            providers: [
                DialogService,
                {
                    provide: MatDialog,
                    useValue: matDialogMock
                }],
        })
            .compileComponents();

        service = TestBed.inject(DialogService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should open error dialog with provided title and message', () => {
        const data: DialogData = {
            title: "Error title",
            message: "Error message"
        };

        service.openErrorDialog(data);
        expect(matDialogMock.open).toHaveBeenCalledWith(
            DialogComponent,
            { width: '400px', data }
        );
    });

    it('should open error dialog with default title and message', () => {
        service.openErrorDialog();
        expect(matDialogMock.open).toHaveBeenCalledWith(
            DialogComponent,
            {
                width: '400px',
                data: {
                    title: "dialog.error_title",
                    message: "dialog.error_message"
                }
            }
        );
    });
});
