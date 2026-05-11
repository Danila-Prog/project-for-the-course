"use client";

import clsx from "clsx";
import { MouseEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

interface IUiModal {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  classNameContent?: string;
  onClose: () => void;
  width?: string;
}
export default function UiModal({
  children,
  className,
  classNameContent,
  isOpen,
  onClose,
  width = "lg:w-[35%]",
}: IUiModal) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const isModal = (e.target as HTMLDivElement).closest("[data-id=modal]");

    if (isModal) return;

    onClose();
  };

  const modal = (
    <div
      onClick={handleClose}
      className={clsx(
        className,
        "fixed inset-0 bg-slate-900/60 backdrop-blur flex justify-center items-center",
      )}
    >
      <div
        data-id="modal"
        className={clsx(
          width,
          classNameContent,
          "bg-white rounded-2xl p-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 w-[95%]",
        )}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modals")!);
}

UiModal.Header = function UiModalHeader({
  children,
  className,
  onClose,
}: Pick<IUiModal, "children" | "className" | "onClose">) {
  return (
    <header
      className={clsx(
        className,
        "text-xl sm:text-2xl min-[1750px]:text-3xl font-bold flex justify-between items-center",
      )}
    >
      {children}
      <button className="cursor-pointer " onClick={onClose}>
        <RxCross2 className="w-5 h-5" />
      </button>
    </header>
  );
};

UiModal.Main = function UiModalMain({
  children,
  className,
}: Pick<IUiModal, "children" | "className">) {
  return <main className={className}>{children}</main>;
};

UiModal.Footer = function UiModalFooter({
  children,
  className,
}: Pick<IUiModal, "children" | "className">) {
  return <footer className={clsx(className)}>{children}</footer>;
};
