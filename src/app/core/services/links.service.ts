import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link, CreateLinkRequest } from '../../shared/models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  
  private apiUrl = 'https://localhost:7287/api/links';

  constructor(private http: HttpClient) {}

  getLinks(folderId?: string | null): Observable<Link[]> {
    const url = folderId 
      ? `${this.apiUrl}?folderId=${folderId}`
      : this.apiUrl;

    return this.http.get<Link[]>(url);
  }

  createLink(request: CreateLinkRequest): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, request);
  }

  deleteLink(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
