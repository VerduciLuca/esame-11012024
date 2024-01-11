import { Country } from "./country";

export interface PaginatedResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: Country[];
}
