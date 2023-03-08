import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css['imageGalleryItem-image']}
        onClick={modalToggle}
      />
      {isModalOpen && (
        <Modal largeImageURL={largeImageURL} onClose={modalToggle} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
