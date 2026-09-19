import PropTypes from "prop-types";

// A plain container that doesn't know or care what's inside it — just
// gives children a consistent card look and a className hook so
// ClubCard/EventCard/etc. can layer their own styles on top.
function Card({ children, className = "" }) {
  return <article className={`card ${className}`.trim()}>{children}</article>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
