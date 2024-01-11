import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {

  _favorites: Country[] = [];

  constructor(private storageService: StorageService){}

  ngOnInit(): void {
    this.getFavoritesFromLocalStorage();
  }

  // getDisplayedname(country: Country): string {
  //   // return country.name.length > 30 ? country.name.substring(0, 27) + '...' : country.name;
  // }


  getFavoritesFromLocalStorage(){
    this._favorites = this.storageService.favorites;
  }

}
