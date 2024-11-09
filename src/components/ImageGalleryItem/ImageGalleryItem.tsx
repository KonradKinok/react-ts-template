import "./ImageGalleryItem.scss";
import React from "react";

interface ImageGalleryItemProps {
  tags: string;
  webformatURL: string;
  openModal: () => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  tags,
  webformatURL,
  openModal,
}) => {
  return (
    <li className="ImageGalleryItem" onClick={openModal}>
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};
