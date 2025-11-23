import { Component, inject } from '@angular/core';
import { LinksService } from '../../../core/services/links.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'links-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './list.html',
})
export class List {
  private service = inject(LinksService);
  links$ = this.service.getLinks();
}
