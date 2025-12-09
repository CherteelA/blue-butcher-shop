import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Avatar, NewProductDTO, Photo, Product_New} from '../data/DTO/NewProductDTO';
import {AuthService} from '../auth/auth-service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss'
})
export class CreateProduct {
  createProductForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    article: new FormControl(null),
    description: new FormControl(null, Validators.required),
    count: new FormControl(null, Validators.required)
  })
  auth = inject(AuthService)
  images: string[] = []
  current_img: string = ''
  http = inject(HttpClient)
  showMessage = false
  message = ""

  showTempMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.message = ""
    }, 1000); // 3 секунды

  }

  save_photo(){
    this.images.push(this.current_img)
    this.current_img = ''
  }

  onSubmit(){
    if(this.createProductForm.valid){

      //@ts-ignore
      let product = new Product_New(this.createProductForm.value.name,
        this.createProductForm.value.description,
        parseFloat(this.createProductForm.value.price!),
        this.createProductForm.value.article,
        parseInt(this.createProductForm.value.count!),
        true,
        this.auth.user?.id
        )

      let avatar = new Avatar(this.images[0])

      let photos: Photo[] = []

      for(let i = 1; i < this.images.length; i++){
        let photo = new Photo(this.images[i])
        photos.push(photo)
      }

      let result = new NewProductDTO(product, photos, avatar)

      this.http.post<Product>('productService/api/products', result, {
        headers: {
          "Authorization": `Bearer ${this.auth.token}`
        }
      }).subscribe(res => {
        this.message = "Товар добавлен"
        this.showTempMessage()
        this.createProductForm.reset()
      },
        err => {
          if (err.error === 'Token expired' || err.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.onSubmit()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
          else if(err.error.message === 'Article is occupied'){
            this.message = "Артикул занят"
            this.showTempMessage()
          }
        })

    }
  }
}
