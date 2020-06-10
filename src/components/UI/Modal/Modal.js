import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

export default function Modal(props) {
  return (
    <>
      {/* Backdrop means we are simply adding a layer over our container which will
      have a z-index of 100 but will show the modal since it has z-index of 500 */}
      <Backdrop hideModal={props.hideModal} show={props.show} />
      <div className={props.show ? 'ModalTrue' : 'Modal'}>{props.children}</div>
    </>
  );
}
