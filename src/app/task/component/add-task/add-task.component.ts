import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { InsertTaskGQL, MyBeautifulQueryGQL } from '../../../../generated/graphql';
import {Auth, getIdToken, onAuthStateChanged, User} from "@angular/fire/auth"
import { jwtDecode } from "jwt-decode";
import jwtEncode from 'jwt-encode';


@Component({
  selector: 'app-add-task',
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
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  queryRef;
  user : User | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo  : Apollo,
    private MyBeautifulQuery : MyBeautifulQueryGQL,
    private InsertTask : InsertTaskGQL,
    private auth : Auth,
  ) {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.queryRef = this.MyBeautifulQuery.watch()
  }



  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.user = user
        getIdToken(user).then((accessToken) => {
          console.log('Access Token:', accessToken);
          const decodedToken = jwtDecode(accessToken)
          console.log(jwtDecode(accessToken))

          const enrichedToken = {
            ...decodedToken,
            "https://hasura.io/jwt/claims": {
              "x-hasura-default-role": "user",
              "x-hasura-allowed-roles": ["user"],
              "x-hasura-user-id": decodedToken?.sub
            }
          };

          const secret = 'side-secret';
          const signedToken = jwtEncode(enrichedToken, secret);
          console.log(signedToken)
        }).catch((error) => {
          console.error('Error getting access token:', error);
        });
      } else {
        console.log('No user is signed in.');
      }
    });
  }



  insertTask() {
    console.log("insert task");
    console.log(this.form.value);
    this.InsertTask.mutate(this.form.value
    ).subscribe((data) => {
      console.log(data);
      this.form.reset();
      this.MyBeautifulQuery.watch().refetch()
      console.log(this.auth.currentUser?.refreshToken)
      console.log(this.auth.currentUser)

    });
  }

}
