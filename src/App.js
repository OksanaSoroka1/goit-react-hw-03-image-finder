import { Component } from 'react';
import './App.css';
import { Searchbar } from './components/Searchbar';
import { GalleryRender } from './components/GalleryRender';
import { Modal } from './components/Modal';

class App extends Component {
  state = {
    search: '',

    openModal: false,
    modalImgData: {
      src: '',
      alt: '',
    },
  };

  onSearchSubmit = data => {
    this.setState({ search: data });
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
    const { openModal, modalImgData, search } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} />
        {/* {search !== '' && } */}
        <GalleryRender onModalOpen={this.onModalOpen} search={search} />

        {openModal === true && (
          <Modal
            onClose={this.toggleModal}
            src={modalImgData.src}
            alt={modalImgData.alt}
          />
        )}
      </div>
    );
  }
}
export default App;
