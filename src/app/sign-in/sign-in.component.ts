import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {Auth,signInWithEmailAndPassword} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,


  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  login () {
    signInWithEmailAndPassword(this.auth,this.loginForm.value.email,this.loginForm.value.password).then(() => this.router.navigate(['']));
  }

  navigate() {
    this.router.navigate(["register"])
  }

  // const { email, password } = this.loginForm.value;
  // this.auth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(() => this.router.navigate(['']));

}
