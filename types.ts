
export interface ComparisonResult {
  summaryRecommendation: string;
  comparisonTable: TableRow[];
  smartTravelTip: string;
}

export interface TableRow {
  platform: string;
  type: string;
  estimatedPrice: string;
  notes: string;
}
