import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import "./confirmToast.scss";

export const confirmToast = (message, onConfirm) => {
  toast.custom(
    (t) => (
      <div className="confirm-toast">
        <div className="confirm-toast-content">
          <div className="confirm-toast-icon">
            <FontAwesomeIcon icon={faQuestion} />
          </div>

          <div className="confirm-toast-message">{message}</div>
        </div>

        <div className="confirm-toast-actions">
          <button
            className="confirm-toast-btn"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>

          <button
            className="confirm-toast-btn"
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
    },
  );
};
