import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../../core/services/links.service';
import { Link } from '../../../shared/models/link.model';

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent {

  links: Link[] = [];

  constructor(private linksService: LinksService) {}

  ngOnInit(): void {
    this.linksService.getLinks().subscribe({
      next: (res: Link[]) => {
        this.links = res;
      },
      error: (err) => console.error(err)
    });
  }
}
