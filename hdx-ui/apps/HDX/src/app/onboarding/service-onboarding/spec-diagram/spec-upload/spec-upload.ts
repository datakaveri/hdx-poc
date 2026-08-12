import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParsedOpenApiSpec, parseOpenApiSpec } from '../openapi-parser';

export interface SpecParsedEvent {
  raw: string;
  parsed: ParsedOpenApiSpec;
}

/**
 * Real (not placeholder) file intake — unlike shared/components/file-dropzone, this actually
 * reads the file's text via FileReader and parses it client-side; nothing is uploaded anywhere.
 */
@Component({
  selector: 'app-spec-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './spec-upload.html',
  styleUrl: './spec-upload.scss',
})
export class SpecUpload {
  readonly specParsed = output<SpecParsedEvent>();

  readonly dragActive = signal(false);
  readonly fileName = signal<string | null>(null);
  readonly pastedText = signal('');
  readonly error = signal<string | null>(null);

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (file) this.readFile(file);
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
    const file = event.dataTransfer?.files?.[0] ?? null;
    if (file) this.readFile(file);
  }

  parsePasted(): void {
    this.fileName.set(null);
    this.parse(this.pastedText());
  }

  private readFile(file: File): void {
    this.fileName.set(file.name);
    const reader = new FileReader();
    reader.onload = () => this.parse(String(reader.result ?? ''));
    reader.onerror = () => this.error.set('Could not read that file.');
    reader.readAsText(file);
  }

  private parse(raw: string): void {
    if (!raw.trim()) {
      this.error.set('Nothing to parse yet.');
      return;
    }
    try {
      const parsed = parseOpenApiSpec(raw);
      this.error.set(null);
      this.specParsed.emit({ raw, parsed });
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Could not parse this spec.');
    }
  }
}
