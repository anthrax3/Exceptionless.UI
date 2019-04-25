import { Directive } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { AuthAccountService } from "../service/auth-account.service";

@Directive({
    selector: "[appUniqueEmail]",
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailUniqueValidatorDirective, multi: true }]
})

export class EmailUniqueValidatorDirective implements AsyncValidator {
    constructor(
        private authAccountService: AuthAccountService
    ) {}

    // TODO: Verify all of our validators component names are correct and that they are implemented to best standards.
    public validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.authAccountService.isEmailAddressAvailable(c.value).map(
            res => {
                if (res.status === 201 ) {
                    return { uniqueEmail: true };
                } else {
                    return null;
                }
            }
        );
    }
}
