import {Component, OnInit} from '@angular/core';
import {ToDoListService} from "../../shared/services/toDoList/to-do-list.service";
import {cardInterface} from "../../shared/interfaces/card.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'card-detail',
  templateUrl: 'card-detail.component.html',
  styleUrls: ['card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  public card!: cardInterface;

  constructor(
    private router: ActivatedRoute,
    private todoListService: ToDoListService,
  ) {
  }

  ngOnInit(): void {
    this.getToDoList();
  }

  private getToDoList(): void {
    const id = this.router.snapshot.params['id']
    this.todoListService.getAllCard().subscribe(res => {
      this.card = res.find((el: cardInterface) => el.id === id);
    })
  }

}
