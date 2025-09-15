import { Injectable } from "@angular/core";
import { catchError, delay, Observable, of } from "rxjs";
import { ImageFilters } from "../models/image-filters.model";

@Injectable({
    providedIn: 'root',
})
export class ImageApiService {
    upload(image: string): Observable<string> {
        return of(image).pipe(
            delay(500),
            catchError(() => {
                throw new Error('Error with uploading the image');
            })
        )
    }

    enhance(image: string): Observable<string> {
        return of(image)
            .pipe(
                delay(500),
                catchError(() => {
                    throw new Error('Error with enhancing the image');
                })
            );
    }

    applyFilters(image: string, filters: ImageFilters): Observable<string> {
        return of(image)
            .pipe(
                delay(500),
                catchError(() => {
                    throw new Error('Error with applying the filters');
                })
            );
    }
}