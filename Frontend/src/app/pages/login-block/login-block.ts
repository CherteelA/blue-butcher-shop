import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {User} from '../../auth/User';
import {LoginPage} from '../login-page/login-page';

@Component({
  selector: 'app-login-block',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './login-block.html',
  styleUrl: './login-block.scss'
})
export class LoginBlock {

  authService = inject(AuthService)
  loginPage = inject(LoginPage);

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  constructor(private router: Router) {}

  public onSubmit( ) {
    if(this.form.valid) {
      //@ts-ignore
      this.authService.signin(this.form.value).subscribe(
        (value) => {
          this.authService.token = value.token;
          if (value.user!= null && value.token != null) {
            this.authService.user = new User(value.user.id, value.user.username, value.user.password, value.user.email, value.user.admin, value.user.created_at);
            localStorage.setItem('token', value.token);
            localStorage.setItem('user_data', JSON.stringify(this.authService.user));

            this.authService.tokenSubject.next(this.authService.token)
            this.router.navigate(['/find'])
          }

        },
        (error) => {
          const errorMessage = error.error?.message || 'Произошла ошибка';
          if(errorMessage == "Неверный email или пароль"){
            this.form.reset();
            this.loginPage.errorMessage = "Неверный пароль";
          }
          else{
            this.form.reset();
            this.loginPage.errorMessage = "Ошибка";
          }
        }
      )



    }
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign_up'])
  }
}
