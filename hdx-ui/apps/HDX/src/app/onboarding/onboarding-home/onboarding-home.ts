import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

interface OnboardingOption {
  path: string;
  title: string;
  description: string;
  icon: string;
  requiresNode?: boolean;
  tourId?: string;
}

@Component({
  selector: 'app-onboarding-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './onboarding-home.html',
  styleUrl: './onboarding-home.scss',
})
export class OnboardingHome {
  readonly auth = inject(AuthService);

  readonly options: OnboardingOption[] = [
    {
      path: '/onboarding/node',
      title: 'Federated Node',
      description: 'Register a new institution onto the exchange — its own stack, its own data, joined by pointer only.',
      icon: 'pi pi-share-alt',
    },
    {
      path: '/onboarding/dataset',
      title: 'Dataset',
      description: 'Publish a dataset from your federated node into the catalogue, with standards and access policy.',
      icon: 'pi pi-database',
      requiresNode: true,
      tourId: 'onboard-dataset-card',
    },
    {
      path: '/onboarding/service',
      title: 'Service',
      description: 'Register a compute or data-processing service and the datasets it is permitted to operate on.',
      icon: 'pi pi-bolt',
      requiresNode: true,
      tourId: 'onboard-service-card',
    },
  ];
}
