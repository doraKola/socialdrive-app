import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'https://localhost:7287/api/users';

  constructor(private http: HttpClient) {}

  /** Load user translation settings */
  getTranslationSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/languages`);
  }

  /** Update settings */
  updateLanguages(data: {
    languages: string[];
    defaultLanguage: string | null;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/languages`, data);
  }
}