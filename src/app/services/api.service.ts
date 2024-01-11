import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Country } from '../interfaces/country'
import { map } from 'rxjs/operators'
import { PaginatedResults } from '../interfaces/paginatedResults';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _apiUrl = 'https://restcountries.com/v3.1/region/europe';

  constructor(private _http: HttpClient) { }

  getCountries(url: string = this._apiUrl, params?: any): Observable<Country[]> {
    const effectiveUrl = url || this._apiUrl;
    let queryParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    return this._http.get<any>(effectiveUrl, { params: queryParams }).pipe(
      map(response => {
        console.log('API Response:', response);
        const results = response.map((country:any) => ({
          ...country,
          flagUrl: country.flags['png']
        }));
        return  results;
      })
    );
  }

  getCountriesBySubregion(subregion: string): Observable<Country[]> {
    const url = `https://restcountries.com/v3.1/subregion/${subregion}`;
    return this._http.get<any>(url).pipe(
      map(response => {
        console.log('API Response:', response);
        const results = response.map((country:any) => ({
          ...country,
          flagUrl: country.flags['png']
        }));
        return  results;
      })
    );
  }

  getCountryDetails(id: number): Observable<Country> {

    return this._http.get<Country>(`${this._apiUrl}/${id}`).pipe(
      map(country => ({
        ...country,
        flagUrl: country.formats['image/jpeg']
      }))
    );
  }

}
