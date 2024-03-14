export interface ICell {
  id: number;
  row: number;
  column: number;
  block: number;
  value: number;
  // options: IOption[];
  // solution: { value: number; method: string }[];
  // trioRow: number;
  // trioColumn: number;
  // solved?: ISolved;
}