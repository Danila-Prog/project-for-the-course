import clsx from "clsx";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IUiModal {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}
export default function UiModal({
  children,
  className,
  isOpen,
  onClose,
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
        "fixed inset-0 bg-slate-900/60 backdrop-blur flex justify-center items-center"
      )}
    >
      <div
        data-id="modal"
        className="bg-white w-[35%] rounded-[10px] px-[40px] pt-[20px] pb-[35px]"
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
}: Pick<IUiModal, "children" | "className">) {
  return (
    <header className={clsx(className, "text-[30px] text-center font-bold")}>
      {children}
    </header>
  );
};

UiModal.Main = function UiModalMain({
  children,
  className,
}: Pick<IUiModal, "children" | "className">) {
  return <main className={clsx(className)}>{children}</main>;
};

UiModal.Footer = function UiModalFooter({
  children,
  className,
}: Pick<IUiModal, "children" | "className">) {
  return <footer className={clsx(className)}>{children}</footer>;
};
