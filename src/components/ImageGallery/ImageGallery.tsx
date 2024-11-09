import "./ImageGallery.scss";
import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

interface Image {
  id: number;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
}

interface ImageGalleryProps {
  data: Image[];
  openModal: (imgUrl: string, tags: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  openModal,
  data,
}) => {
  return (
    <ul className="ImageGallery">
      {data &&
        data.map((image) => (
          <ImageGalleryItem
            key={image.id}
            tags={image.tags}
            webformatURL={image.webformatURL}
            openModal={() => openModal(image.largeImageURL, image.tags)}
          />
        ))}
    </ul>
  );
};
