import { ILink } from "./link.interface";

export interface IInfoResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from?: string;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to?: string;
  total: number;
}