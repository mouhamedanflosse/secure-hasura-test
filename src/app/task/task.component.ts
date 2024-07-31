import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { TasksComponent } from './component/tasks/tasks.component';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { MyBeautifulQueryGQL, MyBeautifulQueryQuery } from '../../generated/graphql';
import { AuthComponent } from '../auth/auth.component';
import {signOut , Auth, User, onAuthStateChanged} from "@angular/fire/auth"
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TasksComponent, NgFor, CommonModule, AddTaskComponent, AuthComponent,MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  user : null | User = null

  tasks$ : Observable<MyBeautifulQueryQuery["tasks"]>

  constructor (
    private MyBeautifulQuery : MyBeautifulQueryGQL,
    private auth : Auth,
    private router : Router,


  ) {
    this.tasks$ = this.MyBeautifulQuery.watch().valueChanges.pipe(map((result) => result.data.tasks))
  }


  onLogout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }

  navigate() {
    this.router.navigate(["login"])
  }

  ngOnInit () {
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          this.user = user
        } else {
          console.log("user not signed in")
        }
    })
  }

}
