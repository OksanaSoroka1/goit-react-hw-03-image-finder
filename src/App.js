import { Component } from 'react';
import './App.css';
import { Searchbar } from './components/Searchbar';
import { searchPhotos } from './API/photo-api';
import { ImageGallery } from './components/ImageGallery';
import { Button } from './components/Button';
import { LoaderSpinner } from './components/Loader';
import { Modal } from './components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    search: '',
    searchArr: [],
    status: Status.IDLE,
    error: null,
    openModal: false,
    modalImgData: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    if (prevSearch !== nextSearch) {
      this.setState({ status: Status.PENDING });

      setTimeout(() => {
        searchPhotos(nextSearch, prevSearch)
          .then(arr =>
            this.setState({ searchArr: arr, status: Status.RESOLVED }),
          )
          .catch(error => {
            this.setState({ error, status: Status.REJECTED });
          });
      }, 1000);
    }
  }
  onSearchSubmit = data => {
    this.setState({ search: data });
  };

  onLoadMore = () => {
    searchPhotos(this.state.search, this.state.search)
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

  toggleModal = () => {
    this.setState(prevState => ({ openModal: !prevState.openModal }));
  };

  onModalOpen = event => {
    if (event.target.nodeName === 'IMG') {
      this.toggleModal();
      this.setState({
        modalImgData: { src: event.target.dataset.src, alt: event.target.alt },
      });
    }
  };

  render() {
    const { status, searchArr, openModal, modalImgData, error } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} />

        {status === 'pending' && <LoaderSpinner />}
        {status === 'resolved' && (
          <ImageGallery
            searchValueArr={searchArr}
            openModal={this.onModalOpen}
          />
        )}
        {status === 'resolved' && <Button onLoadMore={this.onLoadMore} />}
        {openModal === true && (
          <Modal
            onClose={this.toggleModal}
            src={modalImgData.src}
            alt={modalImgData.alt}
          />
        )}
        {error && alert(`${error.message}`)}
      </div>
    );
  }
}
export default App;
