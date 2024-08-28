import PropTypes from 'prop-types';

export default function PBT({ name = "Unknown", age = 0, children = null }) {
  // Handle cases where `name` might be null or non-string
  let displayName;
  if (name === null || typeof name !== 'string' || name.trim() === '') {
    displayName = 'Unknown';
  } else if (name === "") {
    displayName = 'Unknown';
  } else {
    displayName = name;
  }
  
  // Ensure `age` is a non-negative number
  const displayAge = typeof age === 'number' && age >= 0 ? age : 0;
  
  // Handle cases where `children` might be invalid
  const displayChildren = Number.isInteger(children) && children >= 0 ? children : 0;

  return (
    <div>
      <h1>Name: {displayName}, Age: {displayAge}, Children: {displayChildren}</h1>
    </div>
  );
}

PBT.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  children: PropTypes.node,
};
