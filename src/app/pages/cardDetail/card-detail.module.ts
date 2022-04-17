import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardDetailComponent} from "./card-detail.component";
import {CardDetailRoutingModule} from "./card-detail-routing.module";
import {SharedModule} from "../../models/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CardDetailRoutingModule,
    SharedModule
  ],
  declarations: [CardDetailComponent]
})
export class CardDetailModule { }
