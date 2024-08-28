import PropTypes from 'prop-types';

export default function SimplePBT({ name }) {
  return (
    <div>
      <h1>Name: {name}</h1>
    </div>
  );
}

SimplePBT.propTypes = {
  name: PropTypes.string,
};
