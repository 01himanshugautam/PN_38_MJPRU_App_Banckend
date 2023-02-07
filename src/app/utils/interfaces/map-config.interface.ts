export interface MapConfig {
  excepts?: string[]; // array of property to exclude from mapped property
  properties?: string[]; // mappedValue should contain only these properties
  strict?: boolean;
}
