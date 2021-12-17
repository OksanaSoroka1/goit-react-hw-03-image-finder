import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={() => onLoadMore()} className={css.Button}>
      Load more
    </button>
  );
};
export { Button };
