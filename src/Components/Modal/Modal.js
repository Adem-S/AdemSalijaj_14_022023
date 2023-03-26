import React from "react";
import "./Modal.css";
import CrossIcon from "../../Assets/cross.svg";

/**
 * Component for Modal
 *
 * @component
 * @example
 * const title = "Modal Title"
 * const icon = "cross.svg"
 * const classStyle = "background-black"
 * const content = <p>Modal content </p>
 * const onClosed = () => handleCloseModal()
 * const preventClickOutside = false
 */
const Modal = ({
  title = "",
  icon = "",
  classStyle = "",
  content,
  onClosed,
  preventClickOutside = false,
}) => {
  return (
    <>
      <div
        className="mask-modal"
        onClick={() => {
          return preventClickOutside ? onClosed() : false;
        }}
      ></div>
      <div className={`modal ${classStyle ?? ""}`}>
        <div className="modal__close">
          {title && <p className="modal__title">{title}</p>}
          {icon && <img src={icon} onClick={() => onClosed()} alt="cross" />}
          {!icon && (
            <img src={CrossIcon} onClick={() => onClosed()} alt="cross" />
          )}
        </div>
        {content && <div className="modal__content">{content}</div>}
      </div>
    </>
  );
};

export default Modal;
