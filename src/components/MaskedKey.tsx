import { CheckCheck, Copy } from "lucide-react";
import Tooltip from "./ui/Tooltip";
import { useState } from "react";
import { copytoClipboard } from "@/utils";

type MaskedKeyProps = {
  unmaskedKey: string;
};

export default function MaskedKey({ unmaskedKey }: MaskedKeyProps) {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div className="flex w-full items-center gap-1">
      <p className="text-xs bg-slate-200 px-1 font-mono">
        {unmaskedKey.split("").slice(0, -5).fill("x").join("") +
          unmaskedKey.split("").slice(-5).join("")}
      </p>
      {copied ? (
        <Tooltip title="copied to clipboard">
          <CheckCheck className="size-4 text-lime-700" />
        </Tooltip>
      ) : (
        <Tooltip title="copy">
          <Copy
            className="size-3 cursor-pointer hover:text-lime-600"
            onClick={() => {
              copytoClipboard(unmaskedKey);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          />
        </Tooltip>
      )}
    </div>
  );
}
