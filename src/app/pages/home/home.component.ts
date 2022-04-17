import {Component, OnInit} from '@angular/core';
import {ModalAddComponent} from "../../components/modal-add/modal-add.component";
import {MatDialog} from "@angular/material/dialog";
import {ToDoListService} from "../../shared/services/toDoList/to-do-list.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {cardInterface, IStatus} from "../../shared/interfaces/card.interface";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  public formsSearch = new FormControl('');
  public arrayCard: Array<cardInterface> = [];
  public search!: string;

  constructor(
    public dialog: MatDialog,
    private todoListService: ToDoListService,
    private routes: Router
  ) {
  }

  public ngOnInit(): void {
    this.getToDoList();
    this.searchName();
  }

  public searchName(): void {
    this.formsSearch.valueChanges.subscribe(res => {
      this.search = res;
    })
  }

  private getToDoList(): void {
    this.todoListService.getAllCard().subscribe(res => {
      this.arrayCard = res.sort((a: any, b: any) => a.status.count - b.status.count);
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        const card = {...result}
        this.todoListService.createCard(card)
      }
    });
  }

  public cardColor({status: {status}}: cardInterface): string {
    if (status === 'Выполнена') {
      return 'green'
    } else {
      return 'red'
    }
  }

  public cartText({status: {status}}: cardInterface): string {
    if (status === 'Выполнена') {
      return 'Angular-Work'
    } else {
      return 'Angular-not-Work'
    }
  }

  public deleteCard({id}: cardInterface): void {
    this.todoListService.deleteCard(id)
  }

  public isToggleStatus(status: string): IStatus {
    if (status === 'Выполнена') {
      return {count: 1, status: 'Нет'}
    } else {
      return {count: 0, status: 'Выполнена'}
    }
  }

  public updateCard(card: cardInterface): void {
    card.status = this.isToggleStatus(card.status.status);
    this.todoListService.updateCard(card, card.id);
  }

  public drop(event: CdkDragDrop<cardInterface[]>) {
    moveItemInArray(this.arrayCard, event.previousIndex, event.currentIndex);
  }

  public deleteSuccess(): void {
    this.arrayCard.forEach((card: cardInterface) => {
      if (card.status.count === 0) {
        this.todoListService.deleteCard(card.id);
      }
    })
  }

  public updateSuccess(): void {
    this.arrayCard.forEach((card: cardInterface) => {
      if (card.status.count === 1) {
        card.status = {count: 0, status: 'Выполнена'};
        this.todoListService.updateCard(card, card.id);
      }
    })
  }

  public deleteAll(): void {
    this.arrayCard.forEach((card: cardInterface) => {
      this.todoListService.deleteCardAll(card.id).subscribe()
    })
  }

  public cardDetail(card: cardInterface): void {
    this.routes.navigate(['card-detail', card.id])
  }
}
