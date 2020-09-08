import React from 'react';
// import { withRouter } from "react-router-dom";

import "../assets/css/modal.css";

function Modal(props) {

  const {onShow, onOk, onClose} = props

  console.log("props", props);
  return (
    <div className={!onShow ? "modal" : "modal is-show"}>
      <div className="modal__inner">
        <div className="modal__close"> </div>
        <div className="modal__body">
          <div className="modal__icon modal__icon--cancel" style={{  backgroundImage: `url(${require('../assets/images/alert-cancel.png')})`}}></div>
          <p>Are you sure?</p>
        </div>
        <div className="modal__footer">
          <button className="modal__btn modal__btn--okay" type="button" name="button" onClick={onOk}>
            <span>OK</span>
          </button>
          <button className="modal__btn modal__btn--cancel" type="button" name="button" onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
