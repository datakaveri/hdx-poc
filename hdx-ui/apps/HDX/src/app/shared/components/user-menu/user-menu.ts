import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Consolidates Profile/Admin/Logout into one dropdown, triggered by the username. */
@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  private readonly elementRef = inject(ElementRef);

  readonly username = input<string | undefined>(undefined);
  readonly isAdmin = input(false);
  readonly logoutClick = output<void>();

  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
