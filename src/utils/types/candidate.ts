export interface Rejected { stage: number; reason: string }

export interface Candidate {
  value: number;
  rejected?: Rejected;
}