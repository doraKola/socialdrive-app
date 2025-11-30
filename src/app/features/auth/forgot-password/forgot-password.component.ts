import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email = '';
  message: string | null = null;
  isLoading = false;

  constructor(private auth: AuthService) {}

  submit() {
    if (!this.email.trim()) return;

    this.isLoading = true;

    this.auth.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        this.message = 'If this email exists, a reset link was sent.';
        this.isLoading = false;

        // DEV ONLY: show token for manual testing
        console.log("Reset token:", res.token);
      },
      error: () => {
        this.message = 'If this email exists, a reset link was sent.';
        this.isLoading = false;
      }
    });
  }
}
