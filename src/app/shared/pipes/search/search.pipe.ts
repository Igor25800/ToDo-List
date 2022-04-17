import { Pipe, PipeTransform } from '@angular/core';
import {cardInterface} from "../../interfaces/card.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<cardInterface>, search: string): Array<cardInterface> {
    if(!value){
      return []
    }
    if(!search){
      return value
    }
    return value.filter(user => user.nameCard.toLowerCase().includes(search.toLowerCase()))
  }

}
