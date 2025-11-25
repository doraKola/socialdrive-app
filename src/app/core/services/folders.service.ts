import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Folder } from '../../shared/models/folder.model';

@Injectable({ providedIn: 'root' })
export class FoldersService {
  private readonly baseUrl = 'https://localhost:7287/api/folders';

  constructor(private http: HttpClient) {}

  getFolders(parentId: string | null = null): Observable<Folder[]> {
      let url = this.baseUrl;

      if (parentId) {
        url += `?parentId=${parentId}`;
      }

      return this.http.get<Folder[]>(url);
  }

  createFolder(folder: any): Observable<Folder> {
    return this.http.post<Folder>(this.baseUrl, folder);
  }

  getFolderParents(folderId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${folderId}/parents`);
  }

}
