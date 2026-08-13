export interface TourStep {
  id: string;
  /** Route to navigate to before locating `selector`. Omitted = stay on the current route. */
  route?: string;
  /** CSS selector (usually a `[data-tour="..."]` hook) for the element to spotlight. Omitted = a centered, un-anchored slide (e.g. chapter intros). */
  selector?: string;
  title: string;
  description: string;
  /** If the target (or an input/textarea inside it) is a text field, fill it with this value once located. */
  autofill?: string;
}

export interface TourChapter {
  id: string;
  title: string;
  steps: TourStep[];
}
