import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Talks directly to the HAPI FHIR server (see hapi-fhir in docker-compose.yml — no auth, CORS open). */
@Injectable({ providedIn: 'root' })
export class FhirService {
  private readonly http = inject(HttpClient);

  getResource<T>(resourceType: string, id: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${environment.fhirUrl}/${resourceType}/${id}`));
  }
}
