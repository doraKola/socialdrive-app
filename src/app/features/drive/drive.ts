import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinksService } from '../../core/services/links.service';
import { FoldersService } from '../../core/services/folders.service';

@Component({
  selector: 'app-drive',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drive.html',
  styleUrl: './drive.scss'
})
export class Drive {

  folders: any[] = [];
  links: any[] = [];
  selectedFolderId: string | null = null;
  showDeleteConfirm = false;
  linkToDelete: any = null;


  // UI states
  isLoading = false;
  fabOpen = false;

  showAddFolder = false;
  showAddLink = false;

  newFolderName = '';
  newLinkUrl = '';

  constructor(
    private linksService: LinksService,
    private foldersService: FoldersService
  ) {}

  ngOnInit() {
    this.loadFolders();
    this.loadLinks();
  }

  loadFolders() {
    this.foldersService.getFolders().subscribe(folders => {
      this.folders = folders;
    });
  }

  loadLinks() {
    this.isLoading = true;
    this.linksService.getLinks(this.selectedFolderId).subscribe({
      next: (links) => {
        this.links = links;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  selectFolder(folder: any | null) {
    this.selectedFolderId = folder ? folder.id : null;
    this.loadLinks();
  }

  get selectedFolderName() {
    if (!this.selectedFolderId) return 'All links';
    const f = this.folders.find(x => x.id === this.selectedFolderId);
    return f ? f.name : 'Folder';
  }

  trackById(_: number, item: any) {
    return item.id;
  }

  openAddFolder() {
    this.showAddFolder = true;
  }

  openAddLink() {
    this.showAddLink = true;
  }

  closeDialogs() {
    this.showAddFolder = false;
    this.showAddLink = false;
    this.newFolderName = '';
    this.newLinkUrl = '';
  }

  createFolder() {
    if (!this.newFolderName.trim()) return;
    this.foldersService.createFolder(this.newFolderName).subscribe(() => {
      this.closeDialogs();
      this.loadFolders();
    });
  }

  createLink() {
    if (!this.newLinkUrl.trim()) return;

    this.linksService.createLink({
      url: this.newLinkUrl,
      folderId: this.selectedFolderId
    }).subscribe(() => {
      this.closeDialogs();
      this.loadLinks();
    });
  }

  askDelete(link: any, event: Event) {
  event.stopPropagation();
  this.linkToDelete = link;
  this.showDeleteConfirm = true;
}

confirmDelete() {
  if (!this.linkToDelete) return;

  this.linksService.deleteLink(this.linkToDelete.id).subscribe(() => {
    this.showDeleteConfirm = false;
    this.linkToDelete = null;
    this.loadLinks();
  });
}

cancelDelete() {
  this.showDeleteConfirm = false;
  this.linkToDelete = null;
}

  toggleFabMenu() {
    this.fabOpen = !this.fabOpen;
  }

  openLink(link: any) {
    window.open(link.url, '_blank');
  }
}
