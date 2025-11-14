import { useState } from "react";
import ReasonModel from "./../../Models/ReasonModel";
export function LeaveTeamButton({ PrpjectId }) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = (reason) => {
    console.log("Reason:", reason);
    setShowModal(false);
  };
  const handledModel = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <button
        className="bg-[var(--btn-secondary-bg)] text-white px-4 py-2  hover:bg-[var(--btn-secondary-hover)]   rounded-[var(--btn-border-radius)] transition-var(--btn-transition) font-[var(--btn-font-family)] transition-[var(--btn-font-size)]  shadow-[var(--btn-shadow)] hover:shadow-[var(--btn-hover-shadow)] cursor-pointer"
        onClick={handledModel}
      >
        {" "}
        مغادرة الفريق{" "}
      </button>

      {showModal && (
        <ReasonModel
          isOpen={showModal}
          onClose={handledModel}
          onConfirm={handleConfirm}
          title={"هل أنت متأكد أنك تريد المغادرة؟"}
          message={"يرجى كتابة السبب أدناه"}
          type={"LeaveTeam"}
          PrpjectId={PrpjectId}
        />
      )}
    </>
  );
}
export default LeaveTeamButton;
