import { Name } from "./name";

export interface Country {

  formats: Record<string, string>;

  id: number;
  name: Name;
  fifa: string;
  flagUrl?: string;
  subregion?: string;
  officialName?: string
  population: number
}
