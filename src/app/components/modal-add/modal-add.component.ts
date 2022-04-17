import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../../pages/home/home.component";
import {ToastrService} from "ngx-toastr";
import * as http from "http";

@Component({
  selector: 'app-modal-add',
  templateUrl: 'modal-add.component.html',
  styleUrls: ['modal-add.component.scss']
})
export class ModalAddComponent  implements OnInit {

  public todoList!: FormGroup;
  public foods = [
    {status: 'Выполнена' , count: 0},
    {status: 'Нет' , count:  1},
  ];

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<any>,
    private toaster: ToastrService
  ) {
  }

  public ngOnInit(): void {
    this.getFormList();
  }

  private getFormList(): void {
      this.todoList = new FormGroup({
        nameCard: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      })
  }

  public addCard(): void {
    const {value} = this.todoList
    if(this.todoList.valid) {
      this.toaster.success('Good')
      this.dialogRef.close(value);
    } else {
      this.toaster.error('error')
    }
  }
}
