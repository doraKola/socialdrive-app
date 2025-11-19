import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../../shared/models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private apiUrl = 'https://localhost:7287/api'; // your API base URL

  constructor(private http: HttpClient) {}

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.apiUrl}/links`);
  }

  addLink(link: Link): Observable<Link> {
    return this.http.post<Link>(`${this.apiUrl}/links`, link);
  }
}
