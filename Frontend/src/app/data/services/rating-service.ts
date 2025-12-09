import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RatingDTO} from '../DTO/UpdateRatingDTO';
import {AuthService} from '../../auth/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  http = inject(HttpClient)
  auth = inject(AuthService)

  getRating(idProduct:string, idUser: string){
    return this.http.get<RatingDTO>(`/productService/api/products/rating?product_id=${idProduct}&user_id=${idUser}`)
  }

  setRating(ratingDTO: RatingDTO) {
    return this.http.post<RatingDTO>(`/productService/api/products/rating`, ratingDTO, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }
}
