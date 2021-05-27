import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private authService: AuthService,public router: Router) { }

  ngOnInit() {
  }
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      this.authService.SendVerificationMail();
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message);
    });
}

}
