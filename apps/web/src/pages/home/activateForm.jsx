import PropagateLoader from "react-spinners/PropagateLoader";

export default function ActivateForm({ type, Header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}>
          {Header}
        </div>
        <div className="popup_message">{text}</div>
        <PropagateLoader color="#1876f2" size={20} loading={loading} />
      </div>
    </div>
  );
}
