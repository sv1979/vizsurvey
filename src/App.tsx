import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./styles/main.scss";
import initialSurveys from "./data/surveys.json";
import { Survey, UserSurveyResponse, View } from "./types";
import { SurveyGrid } from "./components/SurveyGrid";
import { SurveyQuestions } from "./components/SurveyQuestions";
import { SurveyResults } from "./components/SurveyResults";
import { EmailMeForm } from "./components/EmailMeForm";
import { HeaderTotals } from "./components/HeaderTotals";
import { Totals } from "./components/Totals";

function App() {
  const [view, setView] = useState<View>("grid");
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys as Survey[]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserSurveyResponse[]>([]);
  const [userFormData, setUserFormData] = useState<{
    username: string;
    email: string;
    company: string;
  } | null>(null);

  useEffect(() => {
    const cookieData = Cookies.get("userFormData");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        if (parsed.username && parsed.email && parsed.company) {
          setUserFormData(parsed);
        }
      } catch (e) {
        console.warn("Invalid cookie data for userFormData", e);
      }
    }

    const cookieSurveys = Cookies.get("surveys");
    if (cookieSurveys) {
      try {
        const savedStatuses = JSON.parse(cookieSurveys) as { id: string; status: string }[];
  
        const merged = initialSurveys.map((survey) => {
          const match = savedStatuses.find((s) => s.id === survey.id);
          return match
            ? { ...survey, status: match.status }
            : survey;
        });
  
        setSurveys(merged);
      } catch (e) {
        console.warn("Invalid cookie data for surveys", e);
      }
    }

    const cookieResponses = Cookies.get("responses");
    if (cookieResponses) {
      try {
        const parsed = JSON.parse(cookieResponses) as UserSurveyResponse[];
        setResponses(parsed);
      } catch (e) {
        console.warn("Invalid cookie data for responses", e);
      }
    }
  }, []);

  const updateResponses = (
    value: UserSurveyResponse[] | ((prev: UserSurveyResponse[]) => UserSurveyResponse[])
  ) => {
    setResponses(prev => {
      const newResponses = typeof value === "function" ? value(prev) : value;
      Cookies.set("responses", JSON.stringify(newResponses), { expires: 30 });
      return newResponses;
    });
  };

  const startSurvey = (index: number) => {
    const selectedSurvey = surveys[index];
    const existingResponse = responses.find((r) => r.surveyId === selectedSurvey.id);

    if (!existingResponse) {
      updateResponses((prev) => [
        ...prev,
        {
          surveyId: selectedSurvey.id,
          answers: new Array(selectedSurvey.questions.length).fill(null),
        },
      ]);
    }

    setCurrentSurveyIndex(index);
    setCurrentQuestionIndex(0);
    setView("questions");
  };

  const updateSurveys = (newSurveys: Survey[]) => {
    setSurveys(newSurveys);
    const minimalSurveys = newSurveys.map(({ id, status }) => ({ id, status }));
    Cookies.set("surveys", JSON.stringify(minimalSurveys), { expires: 30 });
    console.log("Saved survey statuses:", Cookies.get("surveys"));
  };

  const finishSurvey = () => {
    if (currentSurveyIndex !== null) {
      const updatedSurveys = [...surveys];
      updatedSurveys[currentSurveyIndex].status = "completed";
      updateSurveys(updatedSurveys);
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

  const unlockYourResultsSubmit = (formData: { username: string; email: string; company: string }) => {
    console.log("Responses: ", responses)
    setUserFormData(formData);
    Cookies.set("userFormData", JSON.stringify(formData), { expires: 30 }); // 30 days
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

    updateResponses((prev) =>
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

    updateResponses((prev) =>
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
          <EmailMeForm onSubmit={unlockYourResultsSubmit}
            initialData={userFormData} />
        )}
      </div>

      {view === "totals" && (
        <Totals surveys={surveys}
          responses={responses}
          currentSurveyId={currentSurvey?.id}
          onSelect={(survey) => {
            const index = surveys.findIndex((s) => s.id === survey.id);
            if (index !== -1) {
              startSurvey(index);
            }
          }}
          onShowResults={(surveyId) => {
            const index = surveys.findIndex((s) => s.id === surveyId);
            if (index !== -1) {
              setCurrentSurveyIndex(index);
            }
          }}
        />
      )}

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
