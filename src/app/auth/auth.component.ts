import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor (
    private auth: Auth,
    private router: Router

  ) {

  }
  onLoginWithGoogle() {
      signInWithPopup(this.auth,new GoogleAuthProvider())
      .then(() => this.router.navigate(['']));
  }
}
