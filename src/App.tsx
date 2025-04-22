import { useState } from "react";
import "./styles/main.scss";
import initialSurveys from "./data/surveys.json";
import { Survey, UserSurveyResponse } from "./types";
import { SurveyGrid } from "./components/SurveyGrid";
import { SurveyQuestions } from "./components/SurveyQuestions";
import { SurveyResults } from "./components/SurveyResults";
import { EmailMeForm } from "./components/EmailMeForm";
import { HeaderTotals } from "./components/HeaderTotals";
import { Totals } from "./components/Totals";

type View = "grid" | "questions" | "results" | "email" | "totals";

function App() {
  const [view, setView] = useState<View>("grid");
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys as Survey[]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserSurveyResponse[]>([]);

  const startSurvey = (index: number) => {
    const selectedSurvey = surveys[index];
    const existingResponse = responses.find((r) => r.surveyId === selectedSurvey.id);

    if (!existingResponse) {
      setResponses((prev) => [
        ...prev,
        { surveyId: selectedSurvey.id, answers: new Array(selectedSurvey.questions.length).fill(null) },
      ]);
    }

    setCurrentSurveyIndex(index);
    setCurrentQuestionIndex(0);
    setView("questions");
  };

  const finishSurvey = () => {
    if (currentSurveyIndex !== null) {
      const updatedSurveys = [...surveys];
      updatedSurveys[currentSurveyIndex].status = "completed";
      setSurveys(updatedSurveys);
    }

    setView("results");
  };

  const goToEmail = () => {
    setView("email");
  };

  const goHome = () => {
    setCurrentSurveyIndex(null);
    setView("grid");
  };

  const unlockYourResultsSubmit = () => {
    console.log("Responses: ", responses)
    setView("totals");
  };

  const currentSurvey =
    currentSurveyIndex !== null ? surveys[currentSurveyIndex] : null;

  const currentResponse = currentSurvey
    ? responses.find((res) => res.surveyId === currentSurvey.id)
    : null;

  const answers = currentResponse?.answers ?? [];

  function onSelectOption(index: number) {
    if (!currentSurvey) return;

    setResponses((prev) =>
      prev.map((response) =>
        response.surveyId === currentSurvey.id
          ? {
            ...response,
            answers: response.answers.map((ans, i) =>
              i === currentQuestionIndex ? index : ans
            ),
          }
          : response
      )
    );
  }

  function onNext(): void {
    if (
      currentSurvey &&
      currentQuestionIndex < currentSurvey.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishSurvey();
    }
  }

  function onPrev(): void {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function restartCurrentSurvey(): void {
    if (!currentSurvey) return;

    setResponses((prev) =>
      prev.map((res) =>
        res.surveyId === currentSurvey.id
          ? { ...res, answers: new Array(currentSurvey.questions.length).fill(null) }
          : res
      )
    );

    setCurrentQuestionIndex(0);
  }

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <img src="/vizlogo.svg" alt="Vizient logo" className="logo" />

          {view === "questions" && currentSurvey && currentQuestionIndex > 0 && (
            <button className="header-restart" type="button" onClick={restartCurrentSurvey}>Restart</button>
          )}

          {view === "totals" && <HeaderTotals surveys={surveys} goHome={goHome} />}
        </div>
      </header>
      <div className="container content-wrapper">
        {view === "grid" && (
          <SurveyGrid
            surveys={surveys}
            onSelect={(survey) => {
              const index = surveys.findIndex((s) => s.id === survey.id);
              if (index !== -1) {
                startSurvey(index);
              }
            }}
          />
        )}
        {view === "questions" && currentSurvey && (
          <SurveyQuestions
            survey={currentSurvey}
            answers={currentResponse?.answers ? currentResponse.answers : []}
            currentIndex={currentQuestionIndex}
            selectedOptionIndex={answers[currentQuestionIndex] ?? null}
            onSelectOption={onSelectOption}
            onNext={onNext}
            onPrev={onPrev}
          />
        )}
        {view === "results" && currentSurvey && currentResponse && (
          <SurveyResults
            survey={currentSurvey}
            answers={currentResponse.answers}
            onRetake={goHome}
            onEmailResults={goToEmail}
            onBackToList={goHome}
          />
        )}
        {view === "email" && (
          <EmailMeForm onSubmit={unlockYourResultsSubmit} />
        )}
        {view === "totals" && (
          <Totals surveys={surveys}
            responses={responses}
            currentSurveyId={currentSurvey?.id}
            onSelect={(survey) => {
              const index = surveys.findIndex((s) => s.id === survey.id);
              if (index !== -1) {
                startSurvey(index);
              }
            }} />
        )}
      </div>
      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Vizient Inc. All rights reserved.
            | <a href="#">Privacy Policy and Legal Notice</a> | <a href="#">Cookie Preferences</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
