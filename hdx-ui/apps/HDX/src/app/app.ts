import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './shared/components/app-header/app-header';

@Component({
  imports: [RouterOutlet, AppHeader],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'HDX';
}
