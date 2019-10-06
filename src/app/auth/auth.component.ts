import { Component, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})


export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        if (this.isLoginMode) {
            //  ...
        } else {
            this.authService.signUp(email, password).subscribe(
                res => {
                this.isLoading = false;
                }, errorMessage => {
                    this.error = errorMessage;
                    console.log(errorMessage);
                    this.isLoading = false;
                }
            );
        }
        form.reset();
    }
}
