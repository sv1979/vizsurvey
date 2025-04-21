import { HexagonData, HexagonDataItem, Question } from "../types";
import { Hexagon } from "./Hexagon";
import { useIsDesktop } from "../hooks/useIsDesktop";

type Props = {
  survey: {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    questions: Question[];
  };
  answers: number[];
  currentIndex: number;
  selectedOptionIndex: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
};

export const SurveyQuestions = ({
  survey,
  answers,
  currentIndex,
  selectedOptionIndex,
  onSelectOption,
  onNext,
  onPrev,
}: Props) => {

  const isDesktop = useIsDesktop();

  const getQuestionText = (index: number): string => {
    return `Question ${index + 1} out of ${survey.questions.length}`
  }

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
    <div className="survey-question-wrapper">
      <ul className="survey-pagination">
        {survey.questions.map((_el, index) => (
          <li key={index} className={currentIndex >= index ? "active" : ""}
          aria-current={currentIndex === index ? "step" : undefined}>
            <span className="sr-only">{getQuestionText(index)}</span>
          </li>
        ))}
      </ul>
      <div className="survey-question">
        <p className="question-survey-title">
          {survey.questions[currentIndex].label}
        </p>
        <h2 className="question-text" dangerouslySetInnerHTML={{
                __html: survey.questions[currentIndex].text
            }}></h2>
        <ul className="options">
          {survey.questions[currentIndex].options.map((option, index) => (
            <li key={index}>
              <button
                className={`option-btn ${selectedOptionIndex === index ? 'selected' : ''
                  }`}
                onClick={() => onSelectOption(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="navigation">
          {currentIndex > 0 && <button onClick={onPrev} className="button-prev"
            aria-label="Go to previous question">
            Previous
          </button>}
          <button onClick={onNext} disabled={selectedOptionIndex === null} className="button-next"
            aria-label="Go to next question">
            Next
          </button>
        </div>
      </div>
      {isDesktop && <Hexagon data={getHexagonData()} currentIndex={currentIndex} />}
    </div>
  );
};
