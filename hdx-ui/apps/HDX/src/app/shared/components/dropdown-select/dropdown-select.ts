import { Component, ElementRef, HostListener, computed, inject, input, output, signal } from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Reimplements apps/IUDX's "custom-dropdown-wrapper" pattern (see
 * styles/dropdown-global.scss + e.g. metadata.component.html) rather than
 * PrimeNG's p-select, since that's the dropdown IUDX actually ships —
 * trigger + panel + checkbox-marked option rows, all from global CSS classes.
 */
@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  templateUrl: './dropdown-select.html',
})
export class DropdownSelect {
  private readonly elementRef = inject(ElementRef);

  readonly options = input.required<DropdownOption[]>();
  readonly value = input<string>('');
  readonly placeholder = input('Select option');
  readonly id = input<string | undefined>(undefined);
  /**
   * Id of an external `<label>` describing this field. A `<div role="button">`
   * isn't a labelable HTML element, so `<label for="...">` can never validly
   * target it (browsers flag that regardless of ARIA role) — `aria-labelledby`
   * is the correct association for a custom widget like this one.
   */
  readonly labelledBy = input<string | undefined>(undefined);
  readonly valueChange = output<string>();

  readonly isOpen = signal(false);

  readonly selectedLabel = computed(() => this.options().find((o) => o.value === this.value())?.label);

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    } else if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }

  select(option: DropdownOption): void {
    this.valueChange.emit(option.value);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
