export type Opportunity = {
  id: string;
  title: string;
  agency: string;
  city: string;
  state: string;
  category: string;
  modality: string;
  value: number | null;
  deadline: string;
  source: string;
  sourceUrl: string;
  demo: boolean;
};

export type AlertRule = {
  id: string;
  keyword: string;
  state: string;
  city: string;
};
