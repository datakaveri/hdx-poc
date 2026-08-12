import { Component } from '@angular/core';

export type IconKey = 'hub' | 'database' | 'bolt' | 'endpoint' | 'schema';

/**
 * Renders once per page (like knowledge_network.html's hidden `<svg><defs>`
 * sprite block) so any graph SVG can reference `<use href="#i-hub">` etc.
 * regardless of which component's <svg> it lives in.
 *
 * Uses <symbol viewBox="0 0 24 24"> rather than <g> — per the SVG spec,
 * `width`/`height` on a <use> element only rescale the referenced content
 * when that content is an <svg> or <symbol>; against a plain <g> they're
 * ignored, so icons rendered at their native 24-unit path size while every
 * <use> was offset assuming a 14/22-unit box, throwing centering off.
 */
@Component({
  selector: 'app-graph-icon-defs',
  standalone: true,
  template: `
    <svg width="0" height="0" style="position: absolute" aria-hidden="true">
      <defs>
        <symbol id="i-hub" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2.4" />
          <circle cx="5" cy="18" r="2.4" />
          <circle cx="19" cy="18" r="2.4" />
          <path d="M12 8.4 6.8 16M12 8.4 17.2 16M7.4 18h9.2" />
        </symbol>
        <symbol id="i-database" viewBox="0 0 24 24">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24">
          <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8z" />
        </symbol>
        <symbol id="i-endpoint" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </symbol>
        <symbol id="i-schema" viewBox="0 0 24 24">
          <path d="M8 3H5a2 2 0 0 0-2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 3h3a2 2 0 0 1 2 2v3M16 21h3a2 2 0 0 0 2-2v-3" />
          <rect x="8" y="8" width="8" height="8" rx="1" />
        </symbol>
      </defs>
    </svg>
  `,
})
export class GraphIconDefs {}
