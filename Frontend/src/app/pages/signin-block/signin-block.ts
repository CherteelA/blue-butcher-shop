import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {User} from '../../auth/User';
import {LoginPage} from '../login-page/login-page';

@Component({
  selector: 'app-signin-block',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signin-block.html',
  styleUrl: './signin-block.scss'
})
export class SigninBlock {

  form = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(""),
    passwordRepeat: new FormControl(null),
    username: new FormControl(null)
  })
  constructor(private router: Router) {}

  authService = inject(AuthService)
  loginPage = inject(LoginPage);

  public onSubmit( ) {
    if(this.form.valid && this.form.value.password == this.form.value.passwordRepeat && this.form.value.password!.length > 4) {
      //@ts-ignore
      this.authService.signup(this.form.value).subscribe(
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
          if(errorMessage == "Email занят"){
            this.form.reset();
            this.loginPage.errorMessage = "Email занят";
          }
          else{
            this.form.reset();
            this.loginPage.errorMessage = "Ошибка";
          }
        }
      )
    }
    else if(this.form.value.password != this.form.value.passwordRepeat){
      this.loginPage.errorMessage = "Пароли не совпадают"
    }
    else if(this.form.value.password!.length <= 4){
      this.loginPage.errorMessage = "Пароль слишком короткий"
    }
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign_in']);
  }



}
