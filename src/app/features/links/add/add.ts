import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LinksService } from '../../../core/services/links.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {

  model = {
    url: '',
    title: '',
    description: '',
    imageUrl: '',
    category: 'General'
  };

  constructor(
    private linksService: LinksService,
    private router: Router
  ) {}

  submit() {
    this.linksService.createLink(this.model).subscribe({
      next: () => this.router.navigate(['/links']),
      error: (err) => console.error('Add failed:', err)
    });
  }
}
