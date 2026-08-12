import { Component, output, signal } from '@angular/core';

/**
 * Local-only drag-and-drop file picker, matching apps/IUDX's upload
 * dropzone pattern — this component itself never uploads anything, it just
 * tracks the files a user has selected and shows them back. `filesChange`
 * lets the parent capture the selection into its own state: a wizard step
 * wrapped in `@if (currentStep() === N)` destroys this component (and its
 * local `files` signal) the moment the user navigates to another step, so
 * `viewChild(FileDropzone)` can't be relied on to still hold the selection
 * by the time a later step (e.g. Review, or submit()) needs it.
 */
@Component({
  selector: 'app-file-dropzone',
  standalone: true,
  templateUrl: './file-dropzone.html',
})
export class FileDropzone {
  readonly files = signal<File[]>([]);
  readonly dragActive = signal(false);
  readonly filesChange = output<File[]>();

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(true);
  }

  onDragLeave(): void {
    this.dragActive.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(false);
    this.addFiles(event.dataTransfer?.files ?? null);
  }

  private addFiles(list: FileList | null): void {
    if (!list?.length) return;
    this.files.update((cur) => [...cur, ...Array.from(list)]);
    this.filesChange.emit(this.files());
  }

  removeFile(index: number): void {
    this.files.update((cur) => cur.filter((_, i) => i !== index));
    this.filesChange.emit(this.files());
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
