import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRootRef = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    return createPortal(
      <img src={this.props.src} alt={this.props.alt} />,
      modalRootRef
    );
  }
}
