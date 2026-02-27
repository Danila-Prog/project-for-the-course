"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  onSubmit: (selectedFile: File) => void;
  onUploadSuccess?: () => void;
  onUploadError?: (error: string) => void;
  textConfirm: string;
  classNameConfirmButton: string;
}

export const UploadPhoto = ({
  onSubmit,
  onUploadSuccess,
  onUploadError,
  textConfirm,
  classNameConfirmButton,
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage(null);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Пожалуйста, выберите файл.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      onSubmit(selectedFile);

      setMessage("Фотография успешно загружена!");
      setPreviewUrl(null);
      setSelectedFile(null);

      onUploadSuccess?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message || "Ошибка при загрузке фотографии.";
        setMessage(errorMessage);
        onUploadError?.(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center">
      {previewUrl && (
        <div className="mb-3 ">
          <span className="block text-center text-sm text-gray-600 mb-1.5">
            Предпросмотр:
          </span>

          <Image
            src={previewUrl}
            alt="Driver preview"
            width={224}
            height={224}
            className="w-56 h-56 object-cover rounded-[10px] border mb-2"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:bg-button-grey file:text-white
            hover:file:bg-[#464646] file:transition-colors file:duration-300 file:cursor-pointer"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className={clsx(
            classNameConfirmButton,
            "w-[300px] h-[50px] px-[16px] rounded-[25px] transition text-white text-[20px] font-medium mt-[30px] disabled:opacity-70 mx-auto",
          )}
        >
          {isLoading ? "Загрузка..." : textConfirm}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${message.includes("успешно") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
