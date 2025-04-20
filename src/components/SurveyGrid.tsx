import { Survey } from "../types";

type Props = {
  surveys: Survey[];
  onSelect: (survey: Survey) => void;
};

export const SurveyGrid = ({ surveys, onSelect }: Props) => {
  return (
    <div className="intro-wrapper">
      <section className="intro">
        <h1>Benchmark Your Progress. Shape Your Strategy.</h1>
        <p>
          This assessment helps you evaluate your organization’s maturity across
          nine key capabilities essential to hospital performance and readiness.
          For each area, you’ll answer six short questions to gauge where you
          are today—whether trailing, emerging, or high-performing. Select a
          category to begin. You can start anywhere.
        </p>
      </section>
      <section className="survey-grid">
        {surveys.map((survey, _index) => (
          <button
            key={survey.id}
            className={`survey-card survey-${survey.status}`}
            onClick={() => onSelect(survey)}
            aria-label={`Start ${survey.title} survey`}
          >
            <span className={`status status-${survey.status}`}>
              <span className="sr-only">
                {survey.status}
              </span>
            </span>
            <h2 className="survey-title">{survey.title}</h2>
            <p className="survey-subtitle">{survey.subtitle}</p>

            <div className={`survey-card-bottom survey-card-bottom-${survey.status}`}>
              {survey.status === "completed" && (
                <span className="status-tag">Completed</span>
              )}
            </div>  
          </button>
        ))}
      </section>
    </div>
  );
};
