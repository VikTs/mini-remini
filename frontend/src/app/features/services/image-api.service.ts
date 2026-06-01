import { Injectable } from "@angular/core";
import { catchError, Observable, map } from "rxjs";
import { ImageFilters } from "../models/image-filters.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export interface ImageResponse {
    image: string
}

@Injectable({
    providedIn: 'root',
})
export class ImageApiService {
    private url = environment.apiUrl;

    constructor(private http: HttpClient) { }

    applyFilters(image: string, filters: ImageFilters): Observable<string> {
        return this.http.post<ImageResponse>(`${this.url}/applyFilters`, { image, filters }, {
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            map((data) => data.image),
            catchError((err) => {
                throw new Error('Error with enhancing the image');
            })
        )
    }
}