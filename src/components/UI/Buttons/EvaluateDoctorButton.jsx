import CreateProject from "../../Models/CreateProject";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

function EvaluateDoctorButton({ projectId }) {
    const navigate = useNavigate();
    return (
        <>
            <button
                onClick={() => navigate(`/evaluate/${projectId}`)}
                className="px-4 py-2 rounded-lg"
                style={{
                    backgroundColor: "var(--btn-primary-bg)",
                    color: "var(--btn-primary-text)"
                }}
            >
                تقييم المشرف
            </button>
        </>
    )
}

export default EvaluateDoctorButton;
