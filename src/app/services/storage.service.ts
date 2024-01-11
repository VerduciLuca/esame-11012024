import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _favorites: Country[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this._favorites = JSON.parse(savedFavorites);
    }

  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this._favorites));
  }

  get favorites(): Country[] {
    return this._favorites;
  }

  addToFavorites(Country: Country) {
    if (!this._favorites.find(favorite => favorite.id === Country.id)) {
      this._favorites.push(Country);
      this.saveFavorites();
    }
  }

  removeFromFavorites(Country: Country) {

    this._favorites = this._favorites.filter(favorite => favorite.id !== Country.id);
    this.saveFavorites();
  }

  isFavorite(Country: Country): boolean {
    return this._favorites.some(favorite => favorite.id === Country.id);
  }
}
