import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchField} from '../../search-field/search-field';

import {MiniPhoto} from '../../mini-photo/mini-photo';
import {PhotoService} from '../../data/services/photo-service';
import {AuthService} from '../../auth/auth-service';
import {FormsModule} from '@angular/forms';
import {CommentsService} from '../../data/services/comments-service';
import {NewCommentDTO} from '../../data/DTO/NewCommentDTO';
import {AutoResizeDirective} from '../../data/services/AutoResizeDirective';
import {Comment} from '../../comment/comment';
import {RatingService} from '../../data/services/rating-service';
import {RatingDTO} from '../../data/DTO/UpdateRatingDTO';
import {DecimalPipe} from '@angular/common';
import {Favorite} from '../../data/DTO/FavoritesDTO';
import {BuyService} from '../../data/services/buy-service';
import {BuyProductDTO} from '../../data/DTO/BuyProductDTO';


@Component({
  selector: 'app-product-page',
  imports: [
    MiniPhoto,
    FormsModule,
    AutoResizeDirective,
    Comment,
    DecimalPipe,
    SearchField
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  urlAvatar: string | null = null;
  data: ForCustomer | null = null;
  http:HttpClient = inject(HttpClient);
  photoService = inject(PhotoService);
  auth = inject(AuthService);
  comment: string | null = null;
  commentsService = inject(CommentsService);
  productId: string | null = null;
  url: string | null = null;
  photosUrl: miniPhoto[] | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  comments: CommentData[] = [];
  displayedComments: CommentData[] = []
  maxComm = 10
  canEdit: boolean = false;
  router = inject(Router);
  admin = false;
  rating = 0
  updateRatingService = inject(RatingService);
  buyService = inject(BuyService);
  isFavorite: boolean = false;
  local_query = ""
  message = ""
  showMessage: boolean = false;

  showTempMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.message = ""
    }, 1000); // 3 секунды

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const url = params['url'];
      this.productId = id
      this.favorite_status()
      if (id) {
        this.createCard(id, url);
      }
      this.loadComments()

      if(this.auth.user!=null){
        this.updateRatingService.getRating(id, this.auth.user.id).subscribe(res => {
          this.rating = res.grade
        })
      }

      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('user_data'));
    });
    if(localStorage.getItem("query") != null) {
      //@ts-ignore
      this.local_query = localStorage.getItem("query")
    }
  }

  private favorite_status(){
    if(this.auth.user!=null){
      this.buyService.getFavoriteStatus(this.auth.user.id, this.productId!).subscribe(res => {
        this.isFavorite = res.answer
      },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.favorite_status()
              },
              (error_) => {
                console.log(error_.error.message);
                this.comment = "";
                this.auth.logout()
              })
          }
        })
    }
  }

  public createCard(id:string, url:string):void {
    this.urlAvatar = url;
    this.url = url

    this.http.get<ForCustomer[]>(`/productService/api/products/id?id=${id}`).subscribe(res => {
      this.data = res[0];
      this.addPhotos(this.data.id)
      if(this.auth.user != null) {

        if(this.auth.user.admin) {
          this.canEdit = true;
          this.admin = true;
        }
        else if(this.auth.user.id == this.data.idVendor) {
          this.canEdit = true;
        }
      }
    });
  }

  private addPhotos(id: string){
    this.photoService.getPhotos(id).subscribe(res => {
      this.photosUrl = res;
    })
  }

  changePhoto(url: string){
    this.url = url
  }

  sendComment(){
    if(this.comment && this.productId) {
      const newComment = new NewCommentDTO(this.comment, this.auth.user!.id, this.productId, this.auth.user!.username)
      this.commentsService.sendComment(newComment).subscribe({
        next: () => {
          // Успешная отправка
          window.location.reload();
          this.comment = "";
        },
        error: (error) => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.sendComment()
            },
              (error_) => {
                console.log(error_.error.message);
                this.comment = "";
                this.auth.logout()
              })
          }
        }
      });
    }
  }

  loadComments(){

    this.commentsService.getAllComments(this.productId!).subscribe(res => {
      this.comments = res
      this.comments = [...this.comments].reverse();
      this.displayedComments = this.comments.slice(0, this.maxComm)
    })
  }

  showMore(){
    this.maxComm+=10
    this.displayedComments = this.comments.slice(0, this.maxComm)
  }

  deleteProduct() {
    this.http.delete<string>(`/productService/api/products?id=${this.productId}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      },
      observe: 'response'
    }).subscribe(response => {
      localStorage.removeItem('query');
      this.router.navigate(['/find'], {
        queryParams: { query: "" },
      });
    }, error => {
      if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
        this.auth.refreshToken().subscribe(
          (value) => {
            this.auth.token = value.token;
            this.auth.user = value.user;
            localStorage.setItem('token', value.token!);
            localStorage.setItem('user_data', JSON.stringify(value.user));
            this.deleteProduct()
          },
          (error_) => {
            console.log(error_.error.message);
            this.auth.logout()
          })
      }

    });
  }


  star(index: number){

    this.rating = index;
    const ratingDto = new RatingDTO(this.productId!, this.auth.user?.id!, this.rating);
    this.updateRatingService.setRating(ratingDto).subscribe(res => {
      }, error => {
        if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
          this.auth.refreshToken().subscribe(
            (value) => {
              this.auth.token = value.token;
              this.auth.user = value.user;
              localStorage.setItem('token', value.token!);
              localStorage.setItem('user_data', JSON.stringify(value.user));
              this.star(index)
            },
            (error_) => {
              console.log(error_.error.message);
              this.auth.logout()
            })
        }

    })
  }


  backPage(){
    localStorage.removeItem("query")
    this.router.navigate(['/find'], {
      queryParams: { query: ""}
    });
  }


  setFavorites(){
    if(this.auth.user && !this.isFavorite) {
      let favorite = new Favorite("", this.productId!, this.auth.user!.id);
      this.buyService.setFavorite(favorite).subscribe(
        res => {
          window.location.reload()
      },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.setFavorites()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
        }
      )
    }
    else if(this.auth.user && this.isFavorite){
      console.log(1)
      this.buyService.deleteFavorite(this.auth.user.id, this.productId!).subscribe(
        res => {

        },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.setFavorites()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
        }
      )
      window.location.reload()
    }

  }

  buyProduct(){
    if(this.auth.user){
      let buyProductDTO = new BuyProductDTO("", this.productId!, this.auth.user.id, "", this.data?.price!)

      this.buyService.setBuyProduct(buyProductDTO).subscribe(res => {
        this.message = "Покупка прошла успешно"
        this.showTempMessage()
      },
        error => {
          if (error.error === 'Token expired' || error.message?.includes('Token expired')) {
            this.auth.refreshToken().subscribe(
              (value) => {
                this.auth.token = value.token;
                this.auth.user = value.user;
                localStorage.setItem('token', value.token!);
                localStorage.setItem('user_data', JSON.stringify(value.user));
                this.buyProduct()
              },
              (error_) => {
                console.log(error_.error.message);
                this.auth.logout()
              })
          }
          else{
            this.message = "Произошла ошибка"
            this.showTempMessage()
          }
        })

    }
  }

}
