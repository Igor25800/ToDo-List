import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path : 'home',
    component: HomeComponent
  },
  {
    path : 'card-detail/:id',
    loadChildren: () => import('./pages/cardDetail/card-detail.module').then(m => m.CardDetailModule)
  },
  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
