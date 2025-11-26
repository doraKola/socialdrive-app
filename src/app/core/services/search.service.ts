import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://localhost:7287/api/search';

  constructor(private http: HttpClient) {}

  globalSearch(searchText: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/global-search", {
      params: { searchText }
    });
  }
}
