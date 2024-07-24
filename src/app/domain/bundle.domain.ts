import { Area } from './area.domain';

export interface Bundle {
  directory: string;
  areas?: Area[];
  bundleName?: string;
}
