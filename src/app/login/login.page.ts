import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: any;
  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('user'));
    if(this.userData!=null){
      this.router.navigate(['notes']);
    }
  }
  logIn(email, password) {
    // email.value='abdulhamit.ylmz@gmail.com';
    // password.value='2153608Ylmz.';
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(res.user.emailVerified){
          this.router.navigate(['notes']);
        }else{
          this.router.navigate(['verify-email']);
        }
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
