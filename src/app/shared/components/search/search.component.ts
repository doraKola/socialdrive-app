import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchQuery = '';
  searchOpen = false;

  folderResults: any[] = [];
  linkResults: any[] = [];

  @Output() selected = new EventEmitter<any>(); // emits folder OR link

  constructor(private searchService: SearchService) {}

  onSearchInput() {
    if (!this.searchQuery.trim()) {
      this.searchOpen = false;
      this.folderResults = [];
      this.linkResults = [];
      return;
    }

    this.searchOpen = true;

    this.searchService.globalSearch(this.searchQuery)
      .subscribe((res: any[]) => {
        this.folderResults = res.filter(x => x.type === 'folder');
        this.linkResults = res.filter(x => x.type === 'link');
      });
  }

  choose(item: any) {
    this.searchOpen = false;
    this.searchQuery = '';
    this.selected.emit(item);   // notify Drive
  }
}
