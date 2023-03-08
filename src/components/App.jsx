import { useState, useEffect } from 'react';
import { fetchSearchImage } from '../services/api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [serchRequest, setSerchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('ideal');
  const [page, setPage] = useState('1');

  useEffect(() => {
    if (serchRequest === '') {
      return;
    }
    setStatus('pending');

    const fetchResponse = async () => {
      const response = await fetchSearchImage(serchRequest, page);

      if (response.length === 0) {
        setStatus(null);
        return alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (response.length > 0) {
        setImages(prevImages => [...prevImages, ...response]);
        setStatus('resolved');
      }
    };

    try {
      fetchResponse();
    } catch (error) {
      setStatus('rejected');
      setError(error);
    }
  }, [serchRequest, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = serchRequest => {
    setSerchRequest(serchRequest);
    setPage(1);
    setImages([]);
  };

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <h2>Whoops, something went wrong: {error.message}</h2>;
  }
  if (status === 'resolved') {
    return (
      <div className="app">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} />
        <Button onClick={loadMore} />
      </div>
    );
  }
  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
    </div>
  );
};

