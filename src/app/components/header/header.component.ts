import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public eventService: EventService) { }

  RefreshList() {
    this.eventService.RefreshList();
  }

  // async getcountrys(url?: string, params?: any): Promise<void> {
  //   await this.apiService.getcountrys(url, params).subscribe(response => {

  //     this._countrys = response.results;
  //     console.log('countrys:', this._countrys);

  //     this.nextPageUrl = response.next;
  //     this.prevPageUrl = response.previous;

  //   });
  // }
}
