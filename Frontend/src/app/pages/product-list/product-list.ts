import {Component, inject} from '@angular/core';
import {BuyProductDTO} from '../../data/DTO/BuyProductDTO';
import {Favorite} from '../../data/DTO/FavoritesDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {BuyService} from '../../data/services/buy-service';
import {AuthService} from '../../auth/auth-service';
import {ProductCard} from '../../product-card/product-card';
import {SearchField} from '../../search-field/search-field';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCard,
    SearchField
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  elements: BuyProductDTO[] | Favorite[] | null = null;
  displayCards: Product[] | null = null;
  cards: Product[] | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  page: string = "";
  buy_service = inject(BuyService);
  size = 24
  max_size = 0
  auth = inject(AuthService)
  router = inject(Router);
  private queryParamsSubscription: Subscription | null = null;
  local_query = ""

  ngOnInit(){
    // Обрабатываем начальные параметры
    this.handleQueryParams(this.route.snapshot.queryParams);

    // Подписываемся на изменения queryParams
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.handleQueryParams(params);
    });
    if(localStorage.getItem("query") != null) {
      //@ts-ignore
      this.local_query = localStorage.getItem("query")
    }
  }



  private handleQueryParams(params: any) {
    this.page = params['page'] || '';
    if (this.page === "favorites") {
      this.getFavorite();
    } else if (this.page === "buy") {
      this.getBuyProduct();
    }
  }

  getBuyProduct(){
    this.buy_service.getBuyProduct().subscribe(data => {
      this.elements = data
      this.getCards()
    },
      error => {
        if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
          this.auth.refreshToken().subscribe(
            (value) => {
              this.auth.token = value.token;
              this.auth.user = value.user;
              localStorage.setItem('token', value.token!);
              localStorage.setItem('user_data', JSON.stringify(value.user));
              this.getBuyProduct()
            },
            (error_) => {
              console.log(error_.error.message);
              this.auth.logout()
            })
        }
      })
  }

  getFavorite(){
    this.buy_service.getFavorite().subscribe(data => {
      this.elements = data
      this.getCards()
    },
      error => {
        if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
          this.auth.refreshToken().subscribe(
            (value) => {
              this.auth.token = value.token;
              this.auth.user = value.user;
              localStorage.setItem('token', value.token!);
              localStorage.setItem('user_data', JSON.stringify(value.user));
              this.getFavorite()
            },
            (error_) => {
              console.log(error_.error.message);
              this.auth.logout()
            })
        }
      })
  }

  private getCards(){
    let ids: string[] = []

    for(let val of this.elements!){
      ids.push(val.productId)
    }
    this.max_size = ids.length
    ids.reverse();
    if(ids.length > 0){
      this.buy_service.getProducts(ids).subscribe(data => {

        this.cards = data
        this.buy_service.getAvatar(ids).subscribe(data => {

          for(let i = 0; i < this.cards!.length!; i++){
            this.cards![i].url = data.urls[i]
          }
          this.displayCards = this.cards!.slice(0, this.size)
        })
      })
    }
    else{
      this.cards = null
    }
  }

  backPage(){
    localStorage.removeItem("query")
    this.router.navigate(['/find'], {
      queryParams: { query: ""}
    });
  }

  public getCard(card: Product) {
    this.router.navigate(['/result'], {
      queryParams: { id: card.id, url: card.url }
    });
  }

  showMore(){
    this.size += 24;
    this.displayCards = this.cards!.slice(0, this.size)
  }

}
