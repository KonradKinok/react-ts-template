import "./Modal.scss";
import React, { useEffect, useCallback } from "react";

interface ModalProps {
  closeModal: () => void;
  imgUrlModal: string;
  tagModal: string;
}

// Komponent Modal w TypeScript
export function Modal({ closeModal, imgUrlModal, tagModal }: ModalProps) {
  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="overlay" onClick={handleClickOutside}>
      <div className="modal">
        <img src={imgUrlModal} alt={tagModal} />
      </div>
    </div>
  );
}
