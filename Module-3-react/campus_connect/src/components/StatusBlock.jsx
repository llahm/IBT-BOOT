import PropTypes from "prop-types";

// One component for both the "loading" and "error" states that every
// fetching page (Clubs, ClubDetails, Events, EventDetails) needs, so
// that behavior stays consistent instead of being re-implemented four
// times with slightly different markup.
function StatusBlock({ kind, message, onRetry }) {
  return (
    <div className={`status-block ${kind === "error" ? "is-error" : ""}`}>
      <p>{message}</p>
      {kind === "error" && onRetry && (
        <button type="button" className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

StatusBlock.propTypes = {
  kind: PropTypes.oneOf(["loading", "error"]).isRequired,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default StatusBlock;
