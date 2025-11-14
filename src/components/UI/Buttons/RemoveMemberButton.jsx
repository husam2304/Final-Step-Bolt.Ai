import ReasonModel from "./../../Models/ReasonModel";
import { useState } from "react";

export function RemoveMemberButton({ ProjectId, StudentId }) {
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
        طرد العضو{" "}
      </button>

      {showModal && (
        <ReasonModel
          isOpen={showModal}
          onClose={handledModel}
          onConfirm={handleConfirm}
          title={"هل أنت متأكد أنك تريد طرد العضو؟"}
          message={"يرجى كتابة السبب أدناه"}
          type={"RemoveMember"}
          ProjectId={ProjectId}
          StudentId={StudentId}
        />
      )}
    </>
  );
}

export default RemoveMemberButton;
