// A single answer option for a question
export type AnswerOption = {
  text: string;
};

export type Question = {
  label: string;
  text: string;
  options: string[]; // "options" will correspond to "answers" in your JSON
}

// Survey status: not started, in progress, completed
export type SurveyStatus = "not-started" | "in-progress" | "completed";

export type Survey = {
  id: string;
  title: string;
  subtitle: string;
  status: SurveyStatus;
  questions: Question[];
};


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
  name: string;
  email: string;
  company: string;
};

export type UserSurveyResponse = {
  surveyId: string; 
  answers: number[]; 
}
