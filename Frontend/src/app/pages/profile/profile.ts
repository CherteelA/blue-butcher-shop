import {Component, inject} from '@angular/core';
import {SearchField} from '../../search-field/search-field';
import {AuthService} from '../../auth/auth-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {EmailChange, NameChange, PasswordChange} from '../../data/DTO/ChangeDTO';
import {Router} from '@angular/router';
import {CreateProduct} from '../../create-product/create-product';

@Component({
  selector: 'app-profile',
  imports: [

    ReactiveFormsModule,
    SearchField,
    CreateProduct
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  auth = inject(AuthService)
  isActive: number[] = [0, 0, 0]
  message = ""
  http = inject(HttpClient)
  showMessage: boolean = false;
  router =inject(Router);
  local_query = ""

  showTempMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.message = ""
    }, 1000); // 3 секунды

  }

  ngOnInit() {
    if(localStorage.getItem("query") != null) {
      //@ts-ignore
      this.local_query = localStorage.getItem("query")
    }
  }


  active(i :number){
    if(this.isActive[i] == 1){
      this.isActive[i] = 0
    }
    else {
      this.isActive[0] = 0
      this.isActive[1] = 0
      this.isActive[2] = 0
      this.isActive[i] = 1
    }
  }

  form1 = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  })

  form2 = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    new_password1: new FormControl(null, Validators.required),
    new_password2: new FormControl(null, Validators.required)
  })

  form3 = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    new_email: new FormControl(null, Validators.required)
  })


  onSubmit1(){
    if(this.form1.valid) {
      let form = new NameChange(this.form1.value.email!, this.form1.value.password!, this.form1.value.name!)
      this.http.put<Responce>(`/userService/api/user/username`, form, {
        headers: {
          "Authorization": `Bearer ${this.auth.token}`
        }
      } ).subscribe(response => {
        this.message = response.message;
        this.showTempMessage()
        if(this.auth.user && this.auth.user.username) {
          //@ts-ignore
          this.auth.user.username = this.form1.value.name
          this.form1.reset();
        }
      },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.onSubmit1()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
          else if(error.error.message === 'Неверный пароль'){
            this.message = "Неверный пароль";
            this.showTempMessage()
          }
        })
    }
  }

  onSubmit2(){
    if(this.form2.valid) {
      // @ts-ignore
      if(this.form2.value.new_password1 && this.form2.value.new_password1.length < 5){
        this.message = "Пароль слишком короткий";
        this.showTempMessage()
        return;
      }
      if(this.form2.value.new_password1 != this.form2.value.new_password2){
        this.message = "Пароли не совподают";
        this.showTempMessage()
        return;
      }

      let form = new PasswordChange(this.form2.value.email!, this.form2.value.password!, this.form2.value.new_password1!)
      this.http.put<Responce>(`/userService/api/user/password`, form, {
        headers: {
          "Authorization": `Bearer ${this.auth.token}`
        }
      } ).subscribe(response => {
          this.message = response.message;
          this.showTempMessage()
          this.form2.reset();
        },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.onSubmit2()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
          else if(error.error.message === 'Неверный пароль'){
            this.message = "Неверный пароль";
            this.showTempMessage()
          }
        })
    }
  }

  onSubmit3(){
    if(this.form3.valid) {
      let form = new EmailChange(this.form3.value.email!, this.form3.value.password!, this.form3.value.new_email!)
      this.http.put<Responce>(`/userService/api/user/email`, form, {
        headers: {
          "Authorization": `Bearer ${this.auth.token}`
        }
      } ).subscribe(response => {
          this.message = response.message;
          this.showTempMessage()
          this.form3.reset();
        },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.onSubmit3()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
          else if(error.error.message === 'Неверный пароль'){
            this.message = "Неверный пароль";
            this.showTempMessage()
          }
          else if(error.error.message === 'Email уже существует'){
            this.message = "Email уже существует";
            this.showTempMessage()
          }
        })
    }
  }

  exit(){

    this.auth.logout();

    this.router.navigate(['/auth/sign_in']);
  }

}

export interface Responce{
  message: string;
}
