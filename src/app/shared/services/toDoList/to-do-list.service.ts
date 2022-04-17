import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from "@angular/fire/firestore";
import {Observable, from, delay} from "rxjs";
import {cardInterface} from "../../interfaces/card.interface";


@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private firestore: Firestore) {
  }


  public getAllCard(): Observable<any> {
    return collectionData(collection(this.firestore, 'cardArray'), {idField: 'id'})
  }

  public createCard(category: cardInterface): Promise<any> {
    return addDoc(collection(this.firestore, "cardArray"), category);
  }

  public updateCard(category: any, id: string): Promise<void> {
    return setDoc(doc(this.firestore, "cardArray", id), category);
  }

  public deleteCard(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, "cardArray", id))
  }

  public deleteCardAll(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, "cardArray", id))).pipe(
      delay(1000)
    )
  }
}
