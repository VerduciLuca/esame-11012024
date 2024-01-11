import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { Country } from '../../interfaces/country';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  country!: Country;
  isFavorite: boolean = false;
  showSubjects: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private storageService: StorageService) { }

  ngOnInit(): void {

    const countryId = this.route.snapshot.paramMap.get('id');

    if (countryId) {
      const id = parseInt(countryId, 10);
      if (!isNaN(id)) {
        this.apiService.getCountryDetails(id).subscribe(country => {
          this.country = country;
          this.isFavorite = this.storageService.isFavorite(country);
        })
      }
    }


  }

  toggleFavorite(): void{
      if (this.isFavorite) {
        this.storageService.removeFromFavorites(this.country);
      } else{
        this.storageService.addToFavorites(this.country);
      }
      this.isFavorite = !this.isFavorite
  }

  toggleSubjects(): void {
    this.showSubjects = !this.showSubjects;
  }
}
