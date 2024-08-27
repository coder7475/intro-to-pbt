import PropTypes from "prop-types";

export default function Greeting({ name }) {
  const displayName = name?.trim() || "World";
  return (
    <>
      <h1>Hello, {displayName}!</h1>
    </>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
