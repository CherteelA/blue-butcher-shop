import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  http = inject(HttpClient)

  getPhotos(id: string){
    return this.http.get<miniPhoto[]>(`/productService/api/products/photo?id=${id}`)
  }

}
