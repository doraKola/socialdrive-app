import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass, SlicePipe } from '@angular/common';

import { LinksService } from '../../core/services/links.service';
import { FoldersService } from '../../core/services/folders.service';
import { FoldersComponent } from '../../shared/components/folders/folders.component';
import { LinkGridComponent } from '../../shared/components/link/link-grid.component';
import { Folder } from '../../shared/models/folder.model';

@Component({
  selector: 'app-drive',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, SlicePipe, FoldersComponent, LinkGridComponent],
  templateUrl: './drive.html',
  styleUrl: './drive.scss',
})
export class Drive {

  folders: any[] = [];
  subFolders: any[] = [];
  links: any[] = [];
  breadcrumbs: any[] | null = null;

  selectedFolderId: string | null = null;
  selectedFolderName: string | null = null;

  selectedsubFolderId: string | null = null;
  selectedSubFolderName: string | null = null;

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
    this.loadLinks(null);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  /** -----------------------------
   *          LOADERS
   * ----------------------------- */

  loadFolders(parentId: string | null = null) {
    this.foldersService.getFolders(parentId).subscribe(f => {
      this.folders = f;
    });
  }

  loadSubFolders(parentId: string | null = null) {
    this.foldersService.getFolders(parentId).subscribe(f => {
      this.subFolders = f;
    });
  }

  loadLinks(selectedFolder: string | null) {
    this.isLoading = true;

    this.linksService
      .getLinks(selectedFolder)
      .subscribe(links => {
        this.links = links;
        this.isLoading = false;
      });
  }

  /** -----------------------------
   *         FOLDERS
   * ----------------------------- */

  /** MAIN FOLDER CLICK */
selectFolder(folder: any | null) {

  /** CASE 1: User clicked “All links” */
  if (folder === null) {

    this.selectedFolderId = null;
    this.selectedFolderName = 'All Links';

    // Clear subfolder selection
    this.selectedsubFolderId = null;
    this.selectedSubFolderName = null;

    // Clear breadcrumbs
    this.breadcrumbs = null;

    // Clear subfolders
    this.subFolders = [];

    // Load root links
    this.loadLinks(null);

    return;
  }

  /** CASE 2: User clicked a MAIN folder */
  if (folder.isMain === true || folder.isMain === undefined) {

    this.selectedFolderId = folder.id;
    this.selectedFolderName = folder.name;

    // Clear subfolder selection
    this.selectedsubFolderId = null;
    this.selectedSubFolderName = null;

    // Clear breadcrumbs
    this.breadcrumbs = null;

    // Load children + links
    this.loadSubFolders(folder.id);
    this.loadLinks(folder.id);

    return;
  }

  /** CASE 3: User clicked a SUBFOLDER */
  if (folder.isMain === false) {

    this.selectedsubFolderId = folder.id;
    this.selectedSubFolderName = folder.name;

    // Load breadcrumbs
    this.foldersService.getFolderParents(folder.id).subscribe(f => {
      this.breadcrumbs = f;
    });

    // Load grandchildren + links
    this.loadSubFolders(folder.id);
    this.loadLinks(folder.id);

    return;
  }
}




  selectSubFolder(folder: any | null) {
    this.selectedsubFolderId = folder ? folder.id : null;
    this.selectedSubFolderName = folder ? folder.name : 'All Links';    
    this.foldersService.getFolderParents(folder.id).subscribe(f => {
      this.breadcrumbs = f;
    });    
    this.loadLinks(this.selectedsubFolderId);
    this.loadSubFolders(this.selectedsubFolderId);
  }

  openAddFolder() {
    this.closeFab();
    this.showAddFolder = true;
  }

  createFolder() {
    if (!this.newFolderName.trim()) return;

    var selectdFolder =  this.selectedsubFolderId ?? this.selectedFolderId;

    this.foldersService.createFolder({ name: this.newFolderName, parentId: selectdFolder}).subscribe(() => {
      this.newFolderName = '';
      this.closeDialogs();
      this.loadFolders();
      if (this.selectedFolderId == null)
        this.loadFolders(selectdFolder);
      else
        this.loadSubFolders(selectdFolder);
    });
  }

  getPreviousBreadcrumb(folderId: string | null) {
  if (!this.breadcrumbs || !folderId) return null;

  const index = this.breadcrumbs.findIndex(bc => bc.id === folderId);
  if (index <= 0) return null; // no previous

  return this.breadcrumbs[index - 1];
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
      folderId: this.selectedsubFolderId ?? this.selectedFolderId
    };

    this.linksService.createLink(payload as any).subscribe(() => {
      this.newLinkUrl = '';
      this.closeDialogs();
      this.loadLinks(this.selectedsubFolderId ?? this.selectedFolderId);
    });
  }

  openLink(link: any) {
    window.open(link.url, '_blank');
  }

  /** -----------------------------
   *     DELETE CONFIRMATION
   * ----------------------------- */

  askDelete(link: any) {
    this.pendingDeleteLinkId = link.id;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.pendingDeleteLinkId = null;
    this.showDeleteConfirm = false;
  }

  askDeleteFolder(folder: Folder | null) {
    if (folder == null) return;
    if (!confirm(`Delete folder "${folder?.name}" and all its links?`)) return;

    this.foldersService.deleteFolder(folder.id).subscribe(() => {
      this.loadFolders();        
      if (this.selectedFolderId === folder.id) {
        this.selectedFolderId = null;
        this.loadLinks(null);
      }
    });
  }

askDeleteSubFolder(folder: Folder | null) {
  if (folder == null) return;
  
  if (!confirm(`Delete folder "${folder?.name}"?`)) return;

  this.foldersService.deleteFolder(folder.id).subscribe(() => {
    this.loadSubFolders(this.selectedFolderId);
    this.loadLinks(this.selectedFolderId);
  });
}

  confirmDelete() {
    if (!this.pendingDeleteLinkId) return;

    this.linksService.deleteLink(this.pendingDeleteLinkId).subscribe(() => {
      this.pendingDeleteLinkId = null;
      this.showDeleteConfirm = false;
      this.loadLinks(null);
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
