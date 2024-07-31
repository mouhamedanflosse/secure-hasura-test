import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { deletetask, editTask } from '../../../ui/icons';
import { Apollo } from 'apollo-angular';
import { DeleteTaskGQL, MyBeautifulQueryGQL } from '../../../../generated/graphql';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input()
  task: any = [];
  queryRef

  constructor(iconRegistery: MatIconRegistry,
     sanitizer: DomSanitizer,
     private apollo : Apollo,
     private DeleteTask : DeleteTaskGQL,
     private MyBeautifulQuery : MyBeautifulQueryGQL
  ) {
    iconRegistery.addSvgIconLiteral(
      deletetask.name,
      sanitizer.bypassSecurityTrustHtml(deletetask.src)
    );
    iconRegistery.addSvgIconLiteral(
      editTask.name,
      sanitizer.bypassSecurityTrustHtml(editTask.src)
    );

    this.queryRef = this.MyBeautifulQuery.watch()
  }

   deleteTask (taskId : string) {
    console.log({taskId})
    console.log("deleting task",taskId)
     this.DeleteTask.mutate({taskId
   }).subscribe((data) => {
      console.log(data)
      this.queryRef.refetch()
    } )
  }
   }
