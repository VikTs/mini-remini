import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { DialogService } from "../shared/services/dialog.service";
import { inject } from "@angular/core";
import { catchError, EMPTY } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const dialogService = inject(DialogService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            switch (err.status) {
                case 0:
                    dialogService.openErrorDialog({ title: "error_statuses.0.title", message: "error_statuses.0.message" });
                    return EMPTY;

                case 500:
                    dialogService.openErrorDialog({ title: "error_statuses.500.title", message: "error_statuses.500.message" });
                    return EMPTY;
            }

            throw err;
        })

    );
};