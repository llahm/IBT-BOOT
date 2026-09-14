import PropTypes from "prop-types";

// Generic wrapper component — it doesn't know or care what's inside it,
// it just gives its children a consistent card container + className hook.
function Card({ children, className = "" }) {
  return (
    <article className={`card ${className}`.trim()}>
      {children}
    </article>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
