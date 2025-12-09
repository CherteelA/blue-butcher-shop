import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth/auth-service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-field',
  imports: [
    FormsModule
  ],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss'
})
export class SearchField {
  router = inject(Router);
  auth = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);

  @Input() searchText: string = "";


  constructor() {

  }

  query: string = "";



  ngOnInit(): void {
    if(this.searchText != undefined){
      this.query = this.searchText
    }
    else{
      this.query = ""
    }
  }

  search(){
    localStorage.setItem("query", this.query)
    this.router.navigate(['/find'], {
      queryParams: { query: this.query }
    });
  }


  backPage(){
    localStorage.removeItem("query")
    this.router.navigate(['/find'], {
      queryParams: { query: "" }
    });
  }

  favorites(){
    if(this.auth.token != null) {
      this.router.navigate(['/some-elements'], {
        queryParams: {page: "favorites"}
      });
    }
  }

  basket(){
    if(this.auth.token != null) {
      this.router.navigate(['/some-elements'], {
        queryParams: {page: "buy"}
      });
    }
  }

  move(){
    if(this.auth.token != null){
      
      this.router.navigate(['/my_profile'], {})
    }
    else{
      this.router.navigate(['/auth/sign_in'], {})
    }
  }

}
