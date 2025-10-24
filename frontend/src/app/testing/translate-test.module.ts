import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule, TranslationObject } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

export class FakeLoader implements TranslateLoader {
    getTranslation(): Observable<TranslationObject> {
        return of({});
    }
}

@NgModule({
    exports: [TranslateModule],
    imports: [TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeLoader }
    })]
})
export class TranslateTestModule { }