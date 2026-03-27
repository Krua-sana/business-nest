export type LeadData = {
  firstName: string;
  surname: string;
  email: string;
  educationLevel: string;
  jobStatus: string;
  age: number | "";
  country: string;
};

export interface InsertAssessment {
  firstName: string;
  surname: string;
  email: string;
  educationLevel: string;
  jobStatus: string;
  age: number;
  country: string;
  answers: number[];
  totalScore: number;
  outcome: string;
}