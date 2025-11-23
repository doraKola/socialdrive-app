import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Folder } from '../../shared/models/folder.model';

@Injectable({ providedIn: 'root' })
export class FoldersService {
  private readonly baseUrl = 'https://localhost:7287/api/folders';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.baseUrl);
  }

  createFolder(name: string): Observable<Folder> {
    return this.http.post<Folder>(this.baseUrl, { name });
  }
}
