import { PropsWithChildren, useState } from "react";

type TooltipProps = PropsWithChildren & {
  title: string;
};
export default function Tooltip({ children, title }: TooltipProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {children}
      {show ? (
        <div className="absolute bg-slate-900 bg-opacity-80 text-xs rounded-md whitespace-nowrap px-2 py-1 text-white left-0 top-0 -translate-x-[50%] -translate-y-[125%]">
          {title}
        </div>
      ) : null}
    </div>
  );
}
