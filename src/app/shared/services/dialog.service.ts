import { Injectable } from "@angular/core";
import { DialogComponent } from "../components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private dialog: MatDialog) { }

    openErrorDialog(data?: DialogData): void {
        this.open({
            title: data?.title || "dialog.error_title",
            message: data?.message || "dialog.error_message"
        });
    }

    private open(data: DialogData): void {
        this.dialog.open(DialogComponent, {
            width: '400px',
            data: {
                title: data.title,
                message: data.message
            }
        });
    }
}

export interface DialogData {
    title: string,
    message: string
}