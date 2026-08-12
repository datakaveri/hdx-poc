import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatasetSampleFile } from '../models/dataset.model';

/** Talks to the Fileserver service (see /fileserver at the repo root, MinIO-backed). */
@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private readonly http = inject(HttpClient);

  async uploadDatasetFile(datasetId: string, file: File): Promise<DatasetSampleFile> {
    const form = new FormData();
    form.append('file', file);
    form.append('refId', datasetId);
    form.append('refType', 'dataset');
    return firstValueFrom(this.http.post<DatasetSampleFile>(`${environment.fileserverUrl}/upload`, form));
  }

  downloadDatasetFile(sampleFile: DatasetSampleFile): Promise<Blob> {
    return firstValueFrom(
      this.http.get(`${environment.fileserverUrl}/download`, {
        params: { key: sampleFile.key },
        responseType: 'blob',
      }),
    );
  }
}
