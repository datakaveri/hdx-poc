import { Route } from '@angular/router';
import { OnboardingHome } from './onboarding-home/onboarding-home';
import { NodeOnboarding } from './node-onboarding/node-onboarding';
import { DatasetOnboarding } from './dataset-onboarding/dataset-onboarding';
import { ServiceOnboarding } from './service-onboarding/service-onboarding';

export const onboardingRoutes: Route[] = [
  { path: '', component: OnboardingHome },
  { path: 'node', component: NodeOnboarding },
  { path: 'dataset', component: DatasetOnboarding },
  { path: 'service', component: ServiceOnboarding },
];
