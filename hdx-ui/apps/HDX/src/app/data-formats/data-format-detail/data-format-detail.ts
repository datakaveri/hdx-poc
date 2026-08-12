import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dataFormats } from '../data-formats.data';
import { McxdeGraph } from '../mcxde/mcxde-graph';

@Component({
  selector: 'app-data-format-detail',
  standalone: true,
  imports: [RouterLink, McxdeGraph],
  templateUrl: './data-format-detail.html',
  styleUrl: './data-format-detail.scss',
})
export class DataFormatDetail {
  // Bound from the `:id` route param via withComponentInputBinding().
  readonly id = input.required<string>();

  readonly format = computed(() => dataFormats.find((f) => f.id === this.id()));
}
