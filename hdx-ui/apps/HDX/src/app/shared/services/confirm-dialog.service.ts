import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogRequest {
  message: string;
  title?: string;
  confirmLabel?: string;
  danger?: boolean;
  resolve: (confirmed: boolean) => void;
}

/**
 * Promise-based replacement for `window.confirm()` — the actual modal is
 * `ConfirmDialogHost`, mounted once at the app root (see app.html), which
 * reads `request()` and renders when non-null.
 */
@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly requestSignal = signal<ConfirmDialogRequest | null>(null);
  readonly request = this.requestSignal.asReadonly();

  confirm(message: string, options?: { title?: string; confirmLabel?: string; danger?: boolean }): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.requestSignal.set({ message, resolve, ...options });
    });
  }

  respond(confirmed: boolean): void {
    this.requestSignal()?.resolve(confirmed);
    this.requestSignal.set(null);
  }
}
