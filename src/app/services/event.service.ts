import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private _refreshListSource = new Subject<void>();
  public refreshList = this._refreshListSource.asObservable();

  RefreshList(){
    this._refreshListSource.next();
  }
}
