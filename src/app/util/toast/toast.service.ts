import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];

  constructor() {}

  open(newToast: ToastInfo) {
    this.toasts.push(newToast);
    if (!newToast.inputCallback) {
      setTimeout(() => {
        this.remove(newToast);
      }, newToast.delay || 10000);
    }
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}

export interface ToastInfo {
  message?: string;
  header?: string;
  delay?: number;
  color?: 'toast-red' | 'toast-green' | 'toast-blue' | 'toast-yellow';
  icon?: string;
  inputCallback?: (value: string) => boolean;
  inputText?: string;
}
