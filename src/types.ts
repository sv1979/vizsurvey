export type AnswerOption = {
  text: string;
};

export type View = "grid" | "questions" | "results" | "email" | "totals";

export type Question = {
  label: string;
  text: string;
  options: string[];
}

export type Survey = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  questions: Question[];
};

export type OutcomeData = {
  headline: string;
  copy: string;
};

export type Outcome = {
  id: string;
  hp: OutcomeData;
  emerging: OutcomeData;
  trailing: OutcomeData;
}


// User's selected answers for a survey
export type SurveyAnswer = {
  questionId: number;
  answerId: number;
};

// All responses for one survey
export type SurveyResult = {
  surveyId: number;
  answers: SurveyAnswer[];
};

// Email form values
export type EmailFormData = {
  username: string;
  email: string;
  company: string;
};

export type UserSurveyResponse = {
  surveyId: string;
  answers: number[];
}

export type HexagonDataItem = { title: string, val: number }

export type HexagonData {
  data: HexagonDataItem[]
}
