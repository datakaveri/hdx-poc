export interface TourStep {
  id: string;
  /** Route to navigate to before locating `selector`. Omitted = stay on the current route. */
  route?: string;
  /** CSS selector (usually a `[data-tour="..."]` hook) for the element to spotlight. */
  selector: string;
  title: string;
  description: string;
}
