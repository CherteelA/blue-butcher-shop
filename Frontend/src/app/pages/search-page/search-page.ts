import {Component, inject} from '@angular/core';
import {ProductCard} from "../../product-card/product-card";
import {SearchField} from "../../search-field/search-field";
import {CardService} from '../../data/services/cardService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [
    ProductCard,
    FormsModule,
    SearchField
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  router = inject(Router);
  cardService = inject(CardService);
  page: number = 1
  cards: Product[] | null = null;

  result: ApiResponse | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);

  searchQuery: string = "";

  local_query: string = "";


  ngOnInit() {
    const strPage: string | null = localStorage.getItem("page")
    if(strPage != null){
      this.page = parseInt(strPage)
    }
    else{
      this.page = 1
    }
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      this.searchQuery = query;
      this.search(query, this.page);

    });
    if(localStorage.getItem("query") != null) {
      //@ts-ignore
      this.local_query = localStorage.getItem("query")
    }
  }

  public search(query: string, page: number = 1): void {
    this.result = undefined;
    this.cardService.getProducts(query, page).subscribe(val => {
      this.result = val;
      if(this.result.page.totalElements == 0){
        this.cards = null
      }
      else {
        this.cards = this.result!._embedded.productForSearchList
      }
    });

  }

  public getCard(card: Product) {
    localStorage.setItem('query', this.searchQuery);
    this.router.navigate(['/result'], {
      queryParams: { id: card.id, url: card.url }
    });
  }

  forward(){
    if(this.result && this.result.page.totalPages > this.page) {
      this.page += 1
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)
    }
  }

  back(){
    if(this.page > 1) {
      this.page -= 1
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)

    }
  }

  setPage(){
    if(this.result) {
      if (this.page > this.result.page.totalPages) {
        this.page = this.result.page.totalPages;
      } else if (this.page < 1) {
        this.page = 1
      }
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)
    }
  }

  backPage(){
    localStorage.removeItem("query")
    this.searchQuery = ""
    this.router.navigate(['/find'], {
      queryParams: { query: this.searchQuery }
    });
  }

}
