import { Survey } from "../types";

type Props = {
  survey: Survey;
  answers: number[];
  onBackToList: () => void;
  onEmailResults: () => void;
  onRetake: () => void;
};

export const SurveyResults = ({
  survey,
  answers,
  onBackToList,
  onEmailResults,
}: Props) => {
  return (
    <section className="survey-results" aria-labelledby="results-heading">
      <h1 id="results-heading">See where you stand.</h1>
      <ul className="results-legend">
        <li>
          <span className="icon-sign trailing"></span> Trailing
        </li>
        <li>
          <span className="icon-sign emerging"></span> Emerging
        </li>
        <li>
          <span className="icon-sign hp"></span> High Performing
        </li>
      </ul>
      <h2>{survey.title}</h2>
      <ul className="answers-list">
        {survey.questions.map((question, index) => (
          <li key={index} className="answers-list-item">

            <strong>Q{index + 1}:</strong> {question.text}
            <br />
            <span className="answer">→ {question.options[answers[index]]}</span>
          </li>
        ))}
      </ul>
      <div className="navigation small-widebuttons">
        <button onClick={onBackToList} className="button-solid-yellow"
          aria-label="View Results">
          View Results
        </button>
        <button onClick={onEmailResults} className="button-taa"
          aria-label="Take another assessment">
          Take another assessment
        </button>
      </div>
    </section>
  );
};
