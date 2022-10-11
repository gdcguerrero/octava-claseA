import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoComponent } from './components/uno/uno.component';
import { DosComponent } from './components/dos/dos.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: UnoComponent
  },
  {
    path: 'search',
    component: DosComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
