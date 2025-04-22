import { Survey } from "../types";
import { useIsDesktop } from "../hooks/useIsDesktop";

type Props = {
  surveys: Survey[];
  goHome: () => void;
};

export const HeaderTotals = ({ surveys, goHome }: Props) => {

  const isDesktop = useIsDesktop();  

  const info = () => {
    const completed = surveys.filter((el) => el.status === "completed").length;

    return `Completed Assessments ${completed}/${surveys.length}`
  }

  return (
    <div className="header-totals">
      {isDesktop && (
        <span className="header-totals-info">{info()}</span>
      )}
      <button onClick={goHome} className="navbutton button-taa">Take New Assessment</button>
    </div>
  )
}
