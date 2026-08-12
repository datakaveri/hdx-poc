import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dataFormats } from '../data-formats.data';

@Component({
  selector: 'app-data-formats-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './data-formats-home.html',
  styleUrl: './data-formats-home.scss',
})
export class DataFormatsHome {
  readonly formats = dataFormats;
}
