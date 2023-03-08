import { useState } from 'react';
import css from './Searchbar.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [serchRequest, setSerchRequest] = useState('');

  const handleSerchRequestChange = e => {
    setSerchRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (serchRequest.trim() === '') {
      return alert('Please fill search request!');
    }

    onSubmit(serchRequest);
    setSerchRequest('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['searchForm-button']}>
          <RxMagnifyingGlass size="30" />
          <span className={css['searchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['searchForm-input']}
          type="text"
          name="serchRequest"
          value={serchRequest}
          onChange={handleSerchRequestChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
