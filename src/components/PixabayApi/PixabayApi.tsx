import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./PixabayApi.scss";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import axios from "axios";
const apiKey = "43602379-82b2565bd0b0a0b53c6c265a8";

interface Image {
  id: number;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
}

interface FetchResponse {
  hits: Image[];
  totalHits: number;
}

export function PixabayApi() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [imgUrlModal, setUrlModal] = useState<string>("");
  const [tagModal, setTagModal] = useState<string>("");
  const [data, setData] = useState<Image[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (newQuery: string) => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setCurrentPage(1);
      setData([]);
      setTotalPages(0);
      setIsButtonVisible(false);
      setError(null);
    }
  };

  const handlePagination = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleLoader = (isLoaderVisible: boolean) => {
    setIsLoaderVisible(isLoaderVisible);
  };

  const handleButton = (isButtonVisible: boolean) => {
    setIsButtonVisible(isButtonVisible);
  };

  const openModal = (imgUrlModal: string, tagModal: string) => {
    setUrlModal(imgUrlModal);
    setTagModal(tagModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleLoader(true);
    const fetchPictures = async () => {
      try {
        const response = await fetchPicturesPerPage(query, currentPage);
        if (response) {
          setData((prev) => [...prev, ...response.hits]);
          const totalPages = Math.ceil(response.totalHits / 12);
          setTotalPages(totalPages);
          const showButton =
            currentPage < totalPages && response.hits.length > 0;
          handleButton(showButton);
        }
      } catch (errors: any) {
        setError(errors.message);
        console.log(
          "%c Error ",
          "color: white; background-color: #D33F49",
          `${error}`,
        );
      } finally {
        handleLoader(false);
      }
    };
    fetchPictures();
  }, [query, currentPage]);

  useEffect(() => {
    if (data.length > 0) {
      toast(
        `Info:\nAktualna strona: ${currentPage}\nLiczba stron: ${totalPages}\nLiczba obrazków na stronie: ${data.length}`,
        { position: "top-right" },
      );
    }
  }, [data]);

  async function fetchPicturesPerPage(
    query: string,
    currentPage: number,
  ): Promise<FetchResponse | undefined> {
    const searchParams = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      per_page: "12",
      page: currentPage.toString(),
    });
    if (query) {
      const url = `https://pixabay.com/api/?${searchParams}`;
      console.log(url);
      const response = await axios.get(url);

      return response.data;
    }
    return;
  }

  return (
    <div className="app">
      <Searchbar handleSearch={handleSearch} />
      {error ? (
        <p>Wystąpił błąd: {error}</p>
      ) : (
        <>
          {isLoaderVisible ? (
            <Loader isLoaderVisible={isLoaderVisible} />
          ) : (
            <>
              <ImageGallery openModal={openModal} data={data} />
              {isButtonVisible && (
                <Button
                  handlePagination={handlePagination}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </>
      )}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          imgUrlModal={imgUrlModal}
          tagModal={tagModal}
        />
      )}
      <Toaster></Toaster>
    </div>
  );
}
