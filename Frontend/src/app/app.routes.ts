import { Routes } from '@angular/router';
import {SearchPage} from './pages/search-page/search-page';
import {LoginPage} from './pages/login-page/login-page';
import {LoginBlock} from './pages/login-block/login-block';
import {SigninBlock} from './pages/signin-block/signin-block';
import {ProductPage} from './pages/product-page/product-page';
import {ProductList} from './pages/product-list/product-list';
import {Profile} from './pages/profile/profile';

export const routes: Routes = [
  {path: 'auth', component: LoginPage, children: [
      {path: 'sign_in', component: LoginBlock},
      {path: 'sign_up', component: SigninBlock},
    ]},
  {path: 'find', component: SearchPage},
  {path: 'result', component: ProductPage},
  {path: 'some-elements', component: ProductList},
  {path: 'my_profile', component: Profile},
];
