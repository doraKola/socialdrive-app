import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass, SlicePipe } from '@angular/common';

import { LinksService } from '../../core/services/links.service';
import { FoldersService } from '../../core/services/folders.service';

@Component({
  selector: 'app-drive',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, SlicePipe],
  templateUrl: './drive.html',
  styleUrl: './drive.scss',
})
export class Drive {

  folders: any[] = [];
  links: any[] = [];

  selectedFolderId: string | null = null;
  selectedFolderName: string = 'All Links';

  isLoading = false;

  // Dialog controls
  fabOpen = false;
  showAddFolder = false;
  showAddLink = false;
  showDeleteConfirm = false;

  newFolderName = '';
  newLinkUrl = '';

  pendingDeleteLinkId: string | null = null;

  constructor(
    private foldersService: FoldersService,
    private linksService: LinksService
  ) {}

  ngOnInit() {
    this.loadFolders();
    this.loadLinks();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  /** -----------------------------
   *          LOADERS
   * ----------------------------- */

  loadFolders() {
    this.foldersService.getFolders().subscribe(f => {
      this.folders = f;
    });
  }

  loadLinks() {
    this.isLoading = true;

    this.linksService
      .getLinks(this.selectedFolderId)
      .subscribe(links => {
        this.links = links;
        this.isLoading = false;
      });
  }

  /** -----------------------------
   *         FOLDERS
   * ----------------------------- */

  selectFolder(folder: any | null) {
    this.selectedFolderId = folder ? folder.id : null;
    this.selectedFolderName = folder ? folder.name : 'All Links';
    this.loadLinks();
  }

  openAddFolder() {
    this.closeFab();
    this.showAddFolder = true;
  }

  createFolder() {
    if (!this.newFolderName.trim()) return;

    this.foldersService.createFolder(this.newFolderName).subscribe(() => {
      this.newFolderName = '';
      this.closeDialogs();
      this.loadFolders();
    });
  }

  /** -----------------------------
   *         LINKS
   * ----------------------------- */

  openAddLink() {
    this.closeFab();
    this.showAddLink = true;
  }

  createLink() {
    if (!this.newLinkUrl.trim()) return;

    const payload = {
      url: this.newLinkUrl,
      folderId: this.selectedFolderId
    };

    this.linksService.createLink(payload as any).subscribe(() => {
      this.newLinkUrl = '';
      this.closeDialogs();
      this.loadLinks();
    });
  }

  openLink(link: any) {
    window.open(link.url, '_blank');
  }

  /** -----------------------------
   *     DELETE CONFIRMATION
   * ----------------------------- */

  askDelete(link: any, event: MouseEvent) {
    event.stopPropagation();
    this.pendingDeleteLinkId = link.id;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.pendingDeleteLinkId = null;
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    if (!this.pendingDeleteLinkId) return;

    this.linksService.deleteLink(this.pendingDeleteLinkId).subscribe(() => {
      this.pendingDeleteLinkId = null;
      this.showDeleteConfirm = false;
      this.loadLinks();
    });
  }

  /** -----------------------------
   *        FAB MENU
   * ----------------------------- */

  toggleFabMenu() {
    this.fabOpen = !this.fabOpen;
  }

  closeFab() {
    this.fabOpen = false;
  }

  /** -----------------------------
   *        DIALOG CONTROL
   * ----------------------------- */

  closeDialogs() {
    this.showAddFolder = false;
    this.showAddLink = false;
  }
}
