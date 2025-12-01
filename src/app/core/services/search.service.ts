import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://socialdrive-api-dwaee7cngkhrdjgw.israelcentral-01.azurewebsites.net/api/search';

  constructor(private http: HttpClient) {}

  globalSearch(searchText: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/global-search", {
      params: { searchText }
    });
  }
}
