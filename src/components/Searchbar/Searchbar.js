import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  state = {
    search: '',
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Write something');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export { Searchbar };
