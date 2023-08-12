import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRootRef = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydownEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydownEsc);
  }

  handleKeydownEsc = event => {
    if (event.code === 'Escape') {
      this.props.handleModalClose();
    }
  };
  render() {
    return createPortal(
      <img src={this.props.src} alt={this.props.alt} />,
      modalRootRef
    );
  }
}
