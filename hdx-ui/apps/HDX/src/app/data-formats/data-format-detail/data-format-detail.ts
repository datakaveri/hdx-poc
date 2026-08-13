import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dataFormats } from '../data-formats.data';
import { ConceptGraph } from '../concept-graph/concept-graph';
import { mcxdeFhirSubtitle, mcxdeHintHtml, mcxdeLegendItems, mcxdeMasterLayout, mcxdeSvgAriaLabel } from '../mcxde/mcxde-graph.config';
import { detailGraphs as mcxdeDetailGraphs, master as mcxdeMaster } from '../mcxde/mcxde-graph-data';
import { mcxdeFhirSamples } from '../mcxde/mcxde-fhir-samples';
import { mcodeFhirSubtitle, mcodeHintHtml, mcodeLegendItems, mcodeMasterLayout, mcodeSvgAriaLabel } from '../mcode/mcode-graph.config';
import { detailGraphs as mcodeDetailGraphs, master as mcodeMaster } from '../mcode/mcode-graph-data';
import { mcodeFhirSamples } from '../mcode/mcode-fhir-samples';

@Component({
  selector: 'app-data-format-detail',
  standalone: true,
  imports: [RouterLink, ConceptGraph],
  templateUrl: './data-format-detail.html',
  styleUrl: './data-format-detail.scss',
})
export class DataFormatDetail {
  // Bound from the `:id` route param via withComponentInputBinding().
  readonly id = input.required<string>();

  readonly format = computed(() => dataFormats.find((f) => f.id === this.id()));

  readonly mcxde = {
    master: mcxdeMaster,
    detailGraphs: mcxdeDetailGraphs,
    fhirSamples: mcxdeFhirSamples,
    legendItems: mcxdeLegendItems,
    masterLayout: mcxdeMasterLayout,
    hintHtml: mcxdeHintHtml,
    svgAriaLabel: mcxdeSvgAriaLabel,
    fhirSubtitleFor: mcxdeFhirSubtitle,
  };

  readonly mcode = {
    master: mcodeMaster,
    detailGraphs: mcodeDetailGraphs,
    fhirSamples: mcodeFhirSamples,
    legendItems: mcodeLegendItems,
    masterLayout: mcodeMasterLayout,
    hintHtml: mcodeHintHtml,
    svgAriaLabel: mcodeSvgAriaLabel,
    fhirSubtitleFor: mcodeFhirSubtitle,
  };
}
