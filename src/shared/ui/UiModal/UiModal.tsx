import clsx from "clsx";
import { MouseEvent, ReactNode } from "react";
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
  width = "w-[35%]",
}: IUiModal) {
  if (!isOpen) return null;

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
          "bg-white rounded-[10px] px-[40px] pt-[20px] pb-[35px]",
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
        "text-xl font-bold flex justify-between items-center",
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
