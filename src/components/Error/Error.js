import PropTypes from 'prop-types';
import css from './error.module.css';

const Error = ({ message }) => {
  return <strong className={css.error}>{message}</strong>;
};
Error.propTypes = {
  message: PropTypes.string,
};
export { Error };
