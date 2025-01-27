import { XIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  title: string;
};

export default function Modal({
  open = false,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!open) {
    return null;
  }

  const body = (
    <div className="fixed top-0 left-0 w-full h-full fade-in-500">
      <div
        className=" bg-opacity-70 bg-slate-100 w-full h-full"
        onClick={onClose}
      >
        <div
          className="w-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-auto bg-white absolute shadow-md border rounded-md"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full flex items-center p-3 justify-between">
            <h2>{title}</h2>
            <XIcon
              onClick={onClose}
              className=" cursor-pointer size-4 text-slate-600 hover:text-slate-900 transition-colors"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(body, document.body);
}
