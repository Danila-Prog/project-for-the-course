"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import { UiButton } from "../UiButton";

interface Props {
  onSubmit: (selectedFile: File) => void;
  onUploadSuccess?: () => void;
  onUploadError?: (error: string) => void;
  textConfirm: string;
  classNameConfirmButton?: string;
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
        <div className="mb-3">
          <span className="inline-block text-sm text-primary-gray mb-1.5">
            Предпросмотр:
          </span>

          <Image
            src={previewUrl}
            alt="Driver preview"
            width={224}
            height={224}
            className="w-56 object-cover rounded-[10px] border mb-2"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mx-auto text-sm text-primary-gray
            file:mr-4 file:py-2 file:px-6
            file:rounded-xl file:border-0
            file:text-sm file:bg-button-grey file:text-white file:bg-secondary-green
            hover:file:scale-[1.02] file:transition file:duration-300 file:cursor-pointer"
          disabled={isLoading}
        />

        <UiButton
          textButton={isLoading ? "Загрузка..." : textConfirm}
          type="submit"
          disabled={!selectedFile || isLoading}
          sizesText="text-base xl:text-lg"
          rounded="rounded-xl"
          className={clsx(
            classNameConfirmButton,
            "py-2 px-6 w-full xl:max-w-[80%] bg-accent-green text-primary-white hover:scale-[1.02] transition mt-6",
          )}
        />
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
