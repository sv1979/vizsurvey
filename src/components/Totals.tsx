import { HexagonData, HexagonDataItem, Survey, UserSurveyResponse } from "../types";
import { Hexagon } from "./Hexagon";

type Props = {
  surveys: Survey[];
  responses: UserSurveyResponse[];
  currentSurveyId?: string;
  onSelect: (survey: Survey) => void;
};

export const Totals = ({ surveys, responses, currentSurveyId, onSelect }: Props) => {

  const currentSurvey = surveys.find(el => el.id === currentSurveyId) ?? surveys[0];
  const currentSurveyResponse = responses.find(el => el.surveyId === currentSurveyId) ?? responses[0];

  const CurrentSurveyInfo: React.FC<{}> = ({ }) => {
    const title = currentSurvey?.title ?? "";
    const subtitle = currentSurvey?.subtitle ?? "";
    return (
      <div className="info">
        <span className="top-title">{title}</span>
        <span className="top-subtitle">{subtitle}</span>
      </div>
    )
  };

  const getHexagonData = (): HexagonData => {
    const dataArray: HexagonDataItem[] = [];

    currentSurvey.questions.map((_question, index) => {
      const dataObject = {
        title: _question.label,
        val: currentSurveyResponse.answers[index]
      }
      dataArray.push(dataObject)
    })

    return { data: dataArray };
  }

  const bodyResult = () => {
    return "High Performing" //TODO
  }

  const bodyHeading = () => {
    return "Keep leading with purpose and presence" //TODO
  }

  const bodyText = () => { //TODO
    return `Your organization demonstrates a high-performing leadership model
     defined by strategic alignment, hands-on engagement and shared accountability. 
     Leaders at all levels are visible, present and consistently reinforcing culture and priorities. 
     According to our research, top-performing organizations are defined by mutual respect, 
     multidisciplinary teamwork and alignment between senior leaders and staff. 
     Your team reflects this through a unified purpose and goal-setting discipline that drives results. 
     The next step is sustaining this momentum while remaining agile through change.`
  }

  return (
    <div className="totals-wrapper">
      <section className="top">
        <CurrentSurveyInfo />
        <div className="info">
          {/* To confirm design */}
        </div>
      </section>
      <section className="totals-body">
        <Hexagon data={getHexagonData()} currentIndex={-1} />
        <div className="totals-body-info">
          <p className="totlas-body-result">{bodyResult()}</p>
          <h1 className="totals-body-heading">{bodyHeading()}</h1>
          <div className="totals-body-text" dangerouslySetInnerHTML={{
            __html: bodyText()
          }}></div>
        </div>
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
