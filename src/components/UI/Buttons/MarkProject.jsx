import { useNavigate } from "react-router-dom";


function MarkProject({ projectId }) {
    const navigate = useNavigate();
    return (
        <>
            <button
                onClick={() => navigate(`/mark/${projectId}`)}
                className="px-4 py-2 rounded-lg"
                style={{
                    backgroundColor: "var(--btn-success-bg)",
                    color: "var(--btn-success-text)"
                }}
            >
                تقييم المشروع
            </button>
        </>
    )
}

export default MarkProject;
