import PropTypes from 'prop-types';

export default function SimplePBT({ name = "Unknown" }) {
  return (
    <div>
      <h1>{name || 'Unknown'}</h1>
    </div>
  );
}

SimplePBT.propTypes = {
  name: PropTypes.string,
};
