import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  token!: string;
  newPassword = '';
  message: string | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  submit() {
    if (!this.newPassword.trim()) return;

    this.isLoading = true;

    this.auth.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password updated successfully.';
        this.isLoading = false;
      },
      error: () => {
        this.message = 'Reset link expired or invalid.';
        this.isLoading = false;
      }
    });
  }
}
