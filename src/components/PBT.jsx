import PropTypes from "prop-types";

export default function PBT({ name, age, children }) {
  console.log({ name, age, children });

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    name = "Unknown";
  }

  if (age < 0 || typeof age !== "number") {
    age = 0;
  }

  if (children < 0 || typeof children !== "number") {
    children = 0;
  }
  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>Age: {age}</h2>
      <h3>Children: {children}</h3>
    </div>
  );
}

PBT.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  children: PropTypes.number,
};
