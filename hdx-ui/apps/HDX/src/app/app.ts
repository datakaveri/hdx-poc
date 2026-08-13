import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './shared/components/app-header/app-header';
import { ConfirmDialogHost } from './shared/components/confirm-dialog-host/confirm-dialog-host';
import { ProductTourOverlay } from './shared/components/product-tour-overlay/product-tour-overlay';

@Component({
  imports: [RouterOutlet, AppHeader, ConfirmDialogHost, ProductTourOverlay],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'HDX';
}
