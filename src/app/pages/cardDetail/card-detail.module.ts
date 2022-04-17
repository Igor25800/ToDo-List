import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardDetailComponent} from "./card-detail.component";
import {CardDetailRoutingModule} from "./card-detail-routing.module";


@NgModule({
  imports: [
    CommonModule,
    CardDetailRoutingModule
  ],
  declarations: [CardDetailComponent]
})
export class CardDetailModule { }
