import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  auth = inject(AuthService);
  public errorMessage: string = "";

  ngOnInit(): void {
  }

  constructor(private router: Router) {}

  public back(){
    this.router.navigate(['/find'])
  }


}
