import { Survey, HexagonData, HexagonDataItem } from "../types";
import { Hexagon } from "./Hexagon";

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

  const getSign = (val: number) => {
    switch (val) {
      case 0:
        return <span className="icon-sign trailing"></span>;
      case 1:
        return <span className="icon-sign emerging"></span>;
      case 2:
        return <span className="icon-sign hp"></span>;
      default:
        return null;
    }
  };

  const getHexagonData = (): HexagonData => {
    const dataArray: HexagonDataItem[] = [];

    survey.questions.map((_question, index) => {
      const dataObject = {
        title: _question.label,
        val: answers[index]
      }
      dataArray.push(dataObject)
    })

    return { data: dataArray };
  }

  return (
    <div className="survey-results-wrapper">
      <Hexagon data={getHexagonData()} currentIndex={-1} />
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
              {getSign(answers[index])}

              <div className="answer-content">
                <strong className="answer-title" dangerouslySetInnerHTML={{
                  __html: `${index + 1}. ${question.text}`
                }}></strong>
                <br />
                <span className="answer-body">{question.options[answers[index]]}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="navigation small-widebuttons">
          <button onClick={onEmailResults} className="navbutton button-solid-yellow"
            aria-label="View Results">
            View Results
          </button>
          <button onClick={onBackToList} className="navbutton button-taa"
            aria-label="Take another assessment">
            Take another assessment
          </button>
        </div>
      </section>
    </div>
  );
};
