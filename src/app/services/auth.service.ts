import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log('auth service const true -'+this.userData);
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        console.log('auth service const false -'+this.userData);
        //JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['login']);
      }
    });
  }
  control(){
    return this.ngFireAuth.authState;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

    // Sign-out
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SignOut() {
      return this.ngFireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
    }
}
