import { Component,  } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {  createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { switchMap, first, mapTo, take, map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private db: AngularFireDatabase,
    private auth: Auth,
    // private createUserGql: CreateUserGQL
  ) {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });


  }

  createUser() {
    const { email, password, fullName } = this.registerForm.value;
    from(createUserWithEmailAndPassword(this.auth ,email, password))
      .pipe(
        map((data) => console.log(data))
        // switchMap(({ user }) => this.metadataCreateWatcher(user)),
        // take(1),
        // switchMap((user) => from(user.getIdToken(true))),
        // switchMap(({ uid: uuid }) =>
        //   this.createUserGql.mutate({ uuid, fullName })
        // )
      )
      .subscribe(() => this.router.navigate(['']), console.error);
  }


  // private metadataCreateWatcher(user: any) {
  //   return this.db
  //     .object(`metadata/${user.uid}/refreshTime`)
  //     .valueChanges()
  //     .pipe(
  //       first((refreshTime) => !!refreshTime),
  //       mapTo(user)
  //     );
  // }
}
