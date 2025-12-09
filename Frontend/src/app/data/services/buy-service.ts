import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth-service';
import {BuyProductDTO} from '../DTO/BuyProductDTO';
import {Favorite} from '../DTO/FavoritesDTO';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  http = inject(HttpClient)
  auth = inject(AuthService)

  getBuyProduct(){
    return this.http.get<BuyProductDTO[]>(`/buyService/api/buy?userID=${this.auth.user!.id}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }

  setBuyProduct(buyProductDTO: BuyProductDTO){
    return this.http.post<BuyProductDTO>(`/buyService/api/buy`, buyProductDTO, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }


  getFavorite(){
    return this.http.get<Favorite[]>(`/buyService/api/favorites?userID=${this.auth.user!.id}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }

  setFavorite(favorite: Favorite){
    return this.http.post<Favorite>(`/buyService/api/favorites`, favorite, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }

  deleteFavorite(user_id: string, product_id: string){
    return this.http.delete<Favorite>(`/buyService/api/favorites?userId=${user_id}&productId=${product_id}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }

  getProducts(ids: string[]){
    let data = new ProductsIdList(ids)
    return this.http.post<Product[]>(`/productService/api/products/elements`, data)
  }

  getAvatar(ids: string[]){
    let avatarRequest = new AvatarRequest(ids)

    return this.http.post<AvatarResponse>(`/productService/api/products/avatar_ids`, avatarRequest)
  }

  getFavoriteStatus(user_Id: string, product_id: string){
    return this.http.get<FavoriteStatusI>(`/buyService/api/favorites_product?userID=${user_Id}&productId=${product_id}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    })
  }

}

class ProductsIdList{
  ids: string[];
  constructor(ids: string[]){
    this.ids = ids;
  }
}

export interface AvatarResponse {
  urls: string[];
}

export class AvatarRequest{
  ids: string[];

  constructor(ids: string[]) {
    this.ids = ids;
  }
}

export interface FavoriteStatusI{
  answer: boolean;
}
