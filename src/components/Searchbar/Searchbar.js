import { Component } from 'react';
import css from './Searchbar.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = { serchRequest: '' };

  handleSerchRequestChange = e => {
    this.setState({ serchRequest: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.serchRequest.trim() === '') {
      return alert('Please fill search request!');
    }

    this.props.onSubmit(this.state.serchRequest);
    this.setState({ serchRequest: '' });
    // e.currentTarget.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['searchForm-button']}>
            <RxMagnifyingGlass size="30" />
            <span className={css['searchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['searchForm-input']}
            type="text"
            name="serchRequest"
            value={this.state.serchRequest}
            onChange={this.handleSerchRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
