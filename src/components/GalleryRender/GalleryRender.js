import { Component } from 'react';
import { searchPhotos } from '../../API/photo-api';
import { ImageGallery } from '../ImageGallery';
import { Button } from '../Button';
import { LoaderSpinner } from '../Loader';
import { Error } from '../Error';
import { Fragment } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class GalleryRender extends Component {
  state = {
    searchArr: [],
    status: Status.IDLE,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ status: Status.PENDING, searchArr: [] });
      searchPhotos(nextSearch, prevSearch)
        .then(arr => {
          this.setState({ searchArr: arr, status: Status.RESOLVED });
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }

  onLoadMore = () => {
    searchPhotos(this.props.search, this.props.search)
      .then(arr =>
        this.setState(prevState => ({
          searchArr: [...prevState.searchArr, ...arr],
          status: Status.RESOLVED,
        })),
      )
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
  };

  onModalOpen = event => {
    this.props.onModalOpen(event);
  };

  render() {
    const { status, searchArr, error } = this.state;

    if (status === 'pending') {
      return <LoaderSpinner />;
    }
    if (status === 'rejected') {
      return <Error message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery
            searchValueArr={searchArr}
            openModal={this.onModalOpen}
          />
          <Button onLoadMore={this.onLoadMore} />
        </>
      );
    }

    return null;
  }
}
export { GalleryRender };
