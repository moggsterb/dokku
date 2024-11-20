import { Candidate } from "./candidate";

export interface Trio {
  block: number;
  trioColumn?: number;
  trioRow?: number;
  type: 'column' | 'row';
  candidates: Candidate[];
}