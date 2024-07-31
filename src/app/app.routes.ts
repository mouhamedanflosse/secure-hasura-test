import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  {
  path: '',
  component: TaskComponent,
},
  {
  path: 'login',
  component: SignInComponent,
},
  {
  path: 'register',
  component: RegisterComponent,
}
]
