import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
  return (
    <>
      <Backdrop hideModal={props.hideModal} show={props.show} />
      <div className={props.show ? 'ModalTrue' : 'Modal'}>{props.children}</div>
    </>
  );
}
export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
