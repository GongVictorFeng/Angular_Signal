import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    form !: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private messageService: MessagesService, 
        private authService: AuthService,
        private router: Router)
    {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    async onLogin() {
        try {
            const {email, password} = this.form.value;
            await this.authService.login(email, password);
            await this.router.navigate(['/home']);
        } 
        catch (err) {
            this.messageService.showMessage("failed to login, please try again", 'error');
            console.error(err)
        }
    }
    
}
