import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [isOpenModal, setIsOpenModal] = useState(initialState);

  const openModal = () => setIsOpenModal(true);

  const closeModal = () => setIsOpenModal(false);

  return { isOpenModal, openModal, closeModal };
};


// const {
//     isOpenModal: isModalOptionsOpen,
//     openModal: openModalOptions,
//     closeModal: closeModalOptions,
//   } = useToggle();