import { Component, inject } from '@angular/core';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog-host',
  standalone: true,
  templateUrl: './confirm-dialog-host.html',
  styleUrl: './confirm-dialog-host.scss',
})
export class ConfirmDialogHost {
  readonly dialog = inject(ConfirmDialogService);

  respond(confirmed: boolean): void {
    this.dialog.respond(confirmed);
  }
}
