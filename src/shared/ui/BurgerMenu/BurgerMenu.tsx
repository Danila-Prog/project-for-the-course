"use client";

import clsx from "clsx";
import { ReactElement, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

interface Props {
  children: ReactElement;
  isShow: boolean;
  onClose: () => void;
}

export const BurgerMenu = ({ children, isShow, onClose }: Props) => {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      onClose();
    }
  }, []);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isShow]);

  useEffect(() => {
    if (!isShow) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShow, onClose]);

  return (
    <aside
      ref={menuRef}
      className={clsx(
        isShow
          ? "flex flex-col lg:hidden absolute top-0 h-full w-[70%] min-[512px]:w-[50%] md:w-[40%] border-l-2 border-secondary-green right-0 z-10 bg-white px-5 py-7"
          : "hidden",
      )}
    >
      <button onClick={onClose} className="ml-auto w-5 h-5">
        <RxCross2 className="w-5 h-5" />
      </button>

      {children}
    </aside>
  );
};
