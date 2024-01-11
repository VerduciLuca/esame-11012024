import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Country } from '../../interfaces/country'
import { EventService } from '../../services/event.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  _countries: Country[] = [];
  _allCountries: Country[] = [];
  _nextPageUrl: string | null = null;
  _prevPageUrl: string | null = null;
  protected isLoading: boolean = true;
  private _apiUrl = 'https://restcountries.com/v3.1/region/europe';


  constructor(private apiService: ApiService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getCountries();
    this.eventService.refreshList.subscribe(() => {
      this.refreshList();
    })
  }

  getCountries(url?: string, params?: any) {
    this.isLoading = true;
    this.apiService.getCountries(url, params)
      .subscribe(countries => {
        this.isLoading = false;
        console.log("countries:", countries);
        this._countries = countries;
        this._allCountries = countries;

        console.log("iterablecountries:", this._countries)

      });
  }

  getCountriesBySubregion(subregion: string): void {
    this.isLoading = true;
    this.apiService.getCountriesBySubregion(subregion)
      .subscribe(countries => {
        this.isLoading = false;
        this._countries = countries;
        console.log("Countries by subregion:", this._countries);
      });
  }
  changePage(direction: 'next' | 'prev'): void {
    const url = direction == 'next'
      ? this._nextPageUrl
      : this._prevPageUrl;

    if (url) {
      this.getCountries(url);
    }
  }

  sortCountries(sortBy: string): void {

    console.log('sortCountries', sortBy);

    const params = { sort: sortBy };
    this.getCountries(this._apiUrl, params);
  }

  searchCountries(searchTerm: string): void {
    if (searchTerm == "")
    {
      this._countries = this._allCountries;
    }
    else{
      this._countries= this._allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }

  refreshList() {
    console.log('event received')
    this.getCountries(this._apiUrl);
  }

}
