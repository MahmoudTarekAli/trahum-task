import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  companyId = localStorage.getItem('userId');
  public inventoriesList = new BehaviorSubject<any>('');
  public list = this.inventoriesList.asObservable();

  constructor(private datePipe: DatePipe) {
  }


}
