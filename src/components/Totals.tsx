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

      <div className="container">
        <section className="top">
          <CurrentSurveyInfo />
          <div className="info">
            {/* To confirm design */}
          </div>
        </section>
      </div>

      <section className="totals-body-wrapper">
        <div className="container">
          <div className="totals-body">
            <Hexagon data={getHexagonData()} currentIndex={-1} />
            <div className="totals-body-info">
              <h1 className="totals-highlight">{bodyResult()}</h1>
              <h2 className="totals-body-heading">{bodyHeading()}</h2>
              <div className="totals-body-text" dangerouslySetInnerHTML={{
                __html: bodyText()
              }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="totals-bottom">
          <h3 className="totals-highlight">What’s Next?</h3>

          <div className="totals-contact">
            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.55143 15.7509C6.878 15.5099 6.12825 15.6126 5.54909 16.0366C5.18095 16.3044 4.54792 16.6972 3.78021 17.0498C4.03162 16.3937 4.22467 15.6528 4.28753 14.8449C4.33242 14.2691 4.13937 13.6978 3.75776 13.2604C2.71169 12.0866 2.15499 10.7119 2.15499 9.28364C2.15499 5.73533 5.89479 2.14238 11.4933 2.14238C17.0917 2.14238 20.8315 5.73533 20.8315 9.28364C20.8315 12.832 17.0917 16.4249 11.4933 16.4249C10.0746 16.4249 8.74117 16.1794 7.55143 15.7509ZM1.18075 17.4872C1.10892 17.6077 1.0326 17.7282 0.951786 17.8487L0.938317 17.871C0.866484 17.9737 0.794652 18.0763 0.722819 18.179C0.565684 18.3888 0.395081 18.5941 0.215499 18.7815C0.00897913 18.9868 -0.0493851 19.2903 0.0628538 19.5581C0.175093 19.8259 0.435487 20 0.727308 20C0.956276 20 1.18524 19.9866 1.41421 19.9643L1.44564 19.9598C1.64318 19.9375 1.84072 19.9107 2.03826 19.875C2.07418 19.8706 2.11009 19.8616 2.14601 19.8527C2.94515 19.6965 3.71286 19.4287 4.39528 19.1341C5.42339 18.6878 6.29885 18.1567 6.83311 17.7684C8.26079 18.2816 9.84111 18.5673 11.5067 18.5673C17.855 18.5673 23 14.412 23 9.28364C23 4.15532 17.8415 0 11.4933 0C5.14503 0 0 4.15532 0 9.28364C0 11.2966 0.794652 13.1578 2.14152 14.6798C2.05622 15.7733 1.62971 16.7463 1.18075 17.4872ZM6.82413 6.42714C6.22702 6.42714 5.74663 6.90471 5.74663 7.49833C5.74663 8.09194 6.22702 8.56952 6.82413 8.56952H16.1624C16.7595 8.56952 17.2399 8.09194 17.2399 7.49833C17.2399 6.90471 16.7595 6.42714 16.1624 6.42714H6.82413ZM6.82413 10.7119C6.22702 10.7119 5.74663 11.1895 5.74663 11.7831C5.74663 12.3767 6.22702 12.8543 6.82413 12.8543H11.8524C12.4495 12.8543 12.9299 12.3767 12.9299 11.7831C12.9299 11.1895 12.4495 10.7119 11.8524 10.7119H6.82413Z" fill="#181818" />
            </svg>
            <h4 className="totals-subtitle">Get in touch</h4>
            <p className="totals-body-text">Connect with a Vizient expert to discuss.</p>
            <a href="#" className="navbutton button-solid-yellow">Contact Vizient</a>
          </div>

          <div className="totlas-explore">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.51147 1.92718C7.946 1.4512 7.90694 0.725206 7.42359 0.297304C6.94024 -0.130597 6.20301 -0.0921341 5.76848 0.383846L3.0832 3.32146L2.0042 2.25892C1.54526 1.81179 0.803144 1.81179 0.344205 2.25892C-0.114735 2.70605 -0.114735 3.44166 0.344205 3.88879L2.29714 5.81194C2.52661 6.03791 2.8342 6.15811 3.15643 6.1485C3.47866 6.13888 3.78137 6.00426 3.99619 5.76867L7.51147 1.92237V1.92718ZM7.51147 9.61979C7.946 9.14381 7.90694 8.41782 7.42359 7.98991C6.94024 7.56201 6.20301 7.60048 5.76848 8.07646L3.0832 11.0141L2.0042 9.95153C1.54526 9.49959 0.803144 9.49959 0.349087 9.95153C-0.10497 10.4035 -0.109853 11.1343 0.349087 11.5814L2.30202 13.5046C2.53149 13.7305 2.83908 13.8507 3.16131 13.8411C3.48355 13.8315 3.78625 13.6969 4.00107 13.4613L7.51636 9.61498L7.51147 9.61979ZM10.5483 4.23015H23.8282C24.4776 4.23015 25 3.71571 25 3.07626C25 2.43681 24.4776 1.92237 23.8282 1.92237H10.5483C9.89894 1.92237 9.37653 2.43681 9.37653 3.07626C9.37653 3.71571 9.89894 4.23015 10.5483 4.23015ZM9.37653 10.7689C9.37653 11.4083 9.89894 11.9228 10.5483 11.9228H23.8282C24.4776 11.9228 25 11.4083 25 10.7689C25 10.1294 24.4776 9.61498 23.8282 9.61498H10.5483C9.89894 9.61498 9.37653 10.1294 9.37653 10.7689ZM7.81418 18.4615C7.81418 19.1009 8.33659 19.6154 8.98594 19.6154H23.8282C24.4776 19.6154 25 19.1009 25 18.4615C25 17.822 24.4776 17.3076 23.8282 17.3076H8.98594C8.33659 17.3076 7.81418 17.822 7.81418 18.4615ZM4.68948 18.4615C4.68948 18.0534 4.52488 17.6621 4.23188 17.3736C3.93889 17.0851 3.5415 16.923 3.12714 16.923C2.71278 16.923 2.31539 17.0851 2.02239 17.3736C1.72939 17.6621 1.56479 18.0534 1.56479 18.4615C1.56479 18.8695 1.72939 19.2608 2.02239 19.5494C2.31539 19.8379 2.71278 20 3.12714 20C3.5415 20 3.93889 19.8379 4.23188 19.5494C4.52488 19.2608 4.68948 18.8695 4.68948 18.4615Z" fill="black" />
            </svg>
            <h4 className="totals-subtitle">Want to explore another area?</h4>
            <p className="totals-body-text">Keep going to uncover more insights across your organization.</p>

            <div className="survey-grid">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
