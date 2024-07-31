import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/component/add-task/add-task.component';
import { MyBeautifulQueryGQL, MyBeautifulQueryQuery } from '../generated/graphql';
import { AuthComponent } from './auth/auth.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgFor,
    NgIf,
    TaskComponent,
    AddTaskComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  // title = 'first_project';
  // tasks$ : Observable<MyBeautifulQueryQuery["tasks"]>

  // constructor (
  //   private MyBeautifulQuery : MyBeautifulQueryGQL
  // ) {
  //   this.tasks$ = this.MyBeautifulQuery.watch().valueChanges.pipe(map((result) => result.data.tasks))
  // }
  // ngOnInit(): void {
  //     // this.task$ = this.apollo.watchQuery<response>({
  //     //   query : ourQuery
  //     // }).valueChanges.pipe(map((result) => result.data.tasks))
  // }
}
