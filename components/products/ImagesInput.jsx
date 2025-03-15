"use client";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./addProduct/Spinner";
import axios from "axios";
function ImagesInput({ images, setImages, className, disabled }) {
  const [isUploading, setIsUploading] = useState(false);
  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, response.data.link];
      });
    }
    setIsUploading(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }
  function deleteImage(link) {
    setImages((prev) => {
      const images = prev.filter((img) => img !== link);
      return images;
    });
  }
  return (
    <>
      <ReactSortable
        disabled={disabled}
        className={className}
        list={images}
        setList={updateImagesOrder}
      >
        {images?.length > 0
          ? images.map((link) => (
              <div key={link} className=" h-[150px] w-[150px] p-2 relative">
                {!disabled && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 absolute right-2 -top-5 cursor-pointer"
                    onClick={() => deleteImage(link)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <img src={link} className="rounded-md max-h-full" />
              </div>
            ))
          : null}
      </ReactSortable>
      {!disabled && (
        <>
          {isUploading && (
            <div className=" border   text-sm  px-4 h-24  flex items-center justify-center rounded-lg cursor-pointer ">
              <Spinner />
            </div>
          )}
          <label className=" border  text-md flex w-[150px] h-[150px] items-center justify-center flex-col rounded-lg cursor-pointer shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" onChange={uploadImages} className=" hidden" />
          </label>
        </>
      )}
    </>
  );
}

export default ImagesInput;
