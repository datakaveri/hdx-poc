import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { AccessRequestService } from '../../services/access-request.service';
import { AuthService } from '../../services/auth.service';
import { AccessResourceType } from '../../models';

/**
 * Self-contained "Request Access" control for a dataset/service/node detail
 * page — hides itself entirely for the resource's own owner or an admin
 * (nothing to request), otherwise renders Request/Pending/Granted/Rejected
 * based on AccessRequestService.statusFor().
 */
@Component({
  selector: 'app-request-access-button',
  standalone: true,
  templateUrl: './request-access-button.html',
  styleUrl: './request-access-button.scss',
})
export class RequestAccessButton implements OnInit {
  private readonly accessRequests = inject(AccessRequestService);
  private readonly auth = inject(AuthService);

  readonly resourceType = input.required<AccessResourceType>();
  readonly resourceId = input.required<string>();
  /** Only meaningful for datasets — lets statusFor() also honor an approved node-level grant. */
  readonly nodeId = input<string | undefined>(undefined);
  readonly ownerId = input<string | undefined>(undefined);

  readonly requesting = signal(false);
  readonly error = signal<string | null>(null);

  readonly isOwnerOrAdmin = computed(() => this.auth.isAdmin() || (!!this.ownerId() && this.ownerId() === this.auth.userId()));
  readonly status = computed(() => this.accessRequests.statusFor(this.resourceType(), this.resourceId(), this.nodeId()));

  ngOnInit(): void {
    this.accessRequests.ensureMineLoaded();
  }

  async request(): Promise<void> {
    this.requesting.set(true);
    this.error.set(null);
    try {
      await this.accessRequests.requestAccess(this.resourceType(), this.resourceId());
    } catch {
      this.error.set('Could not submit the request.');
    } finally {
      this.requesting.set(false);
    }
  }
}
