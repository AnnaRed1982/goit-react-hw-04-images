import { Component } from 'react';
import { fetchSearchImage } from '../services/api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    serchRequest: '',
    images: [],
    error: null,
    status: 'ideal',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.serchRequest !== this.state.serchRequest ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      try {
        const response = await fetchSearchImage(
          this.state.serchRequest,
          this.state.page
        );
        if (response.length === 0) {
          this.setState({ status: null });
          return alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (response.length > 0) {
          this.setState(({ images }) => ({
            images: [...images, ...response],
            status: 'resolved',
          }));
        }
      } catch (error) {
        this.setState({ status: 'rejected', error });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = serchRequest => {
    this.setState({ serchRequest, page: 1, images: [] });
  };

  render() {
    const { status, error, images } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h2>Whoops, something went wrong: {error.message}</h2>;
    }
    if (status === 'resolved') {
      return (
        <div className="app">
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} />
          <Button onClick={this.loadMore} />
        </div>
      );
    }
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}
