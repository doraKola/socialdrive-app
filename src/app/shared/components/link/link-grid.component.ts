import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf, NgClass, SlicePipe } from '@angular/common';
import { TruncateWordsPipe } from '../../pipes/truncate-words.pipe';

@Component({
  selector: 'app-link-grid',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, SlicePipe, TruncateWordsPipe],
  templateUrl: './link-grid.component.html',
  styleUrls: ['./link-grid.component.scss']
})
export class LinkGridComponent {
  @Input() links: any[] = [];
  @Input() highlightedLinkId: string | null = null;

  @Output() open = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  trackById(index: number, item: any) {
    return item.id;
  }

  onOpen(link: any) {
    this.open.emit(link);
  }

  onDelete(link: any, event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit(link);
  }
}
