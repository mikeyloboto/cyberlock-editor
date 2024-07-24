import { Component } from '@angular/core';
import { ToastInfo, ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(protected toastService: ToastService) {}

  conditionalRemove(condition: boolean, toast: ToastInfo) {
    if (condition) {
      this.toastService.remove(toast);
    }
  }
}
