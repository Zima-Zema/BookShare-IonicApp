import { AbstractControl } from "@angular/forms";

export function passwordMatcher(c: AbstractControl) {
    let pass = c.get('password');
    let cPass = c.get('confirmPassword');
    if (pass.value === cPass.value) {
        return null;
    }
    return { 'match': true };
}