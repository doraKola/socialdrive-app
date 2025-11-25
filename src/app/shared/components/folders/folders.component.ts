import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Folder } from '../../models/folder.model';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss',
})
export class FoldersComponent {

  /** All user folders */
  @Input() folders: Folder[] = [];

  /** Currently selected folder id */
  @Input() selectedFolderId: string | null = null;

  /** Emit when user selects a folder */
  @Output() folderSelected = new EventEmitter<Folder | null>();

  /** Emit when user clicks + New Folder */
  @Output() createNewFolder = new EventEmitter<void>();

  @Output() deleteFolderEvent = new EventEmitter<Folder | null>();

  trackById(index: number, item: any) {
    return item.id;
  }

  select(folder: Folder | null) {
    this.folderSelected.emit(folder);
  }

  newFolder() {
    this.createNewFolder.emit();
  }

  deleteFolder(folder: Folder | null) {
    this.deleteFolderEvent.emit(folder);
  }
}
