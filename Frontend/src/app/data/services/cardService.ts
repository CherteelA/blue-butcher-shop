import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QueryDTO} from '../DTO/query.DTO';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  http = inject(HttpClient)


  getProducts(query:string, page:number){
    const queryDTO = new QueryDTO(query, 24, page-1)
    return this.http.post<ApiResponse>('/searchService/api/query', queryDTO)
  }
}
