import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Country} from "../interfaces/pais.interface";

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  get params(){
    return new HttpParams().set('fields', 'name,capital,population,flags,cca2');
  }

  constructor(private readonly http: HttpClient) {
  }

  searchByName(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${query}`, {params: this.params});
    // .pipe(
    //   catchError((err, caught) => of([]))
    // );
  }

  searchByCapital(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${query}`, {params: this.params});
  }

  searchByCode(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${query}`);
  }

  searchByRegion(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${query}`, {params: this.params})
      .pipe(tap(console.log));
  }

}
