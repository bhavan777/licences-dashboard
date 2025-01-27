import api from "@/api";
import { copytoClipboard } from "@/utils";
import { CheckCheck, Copy, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";

export default function GenerateSecureLink({ id }: { id: string }) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [secureLink, setSecureLink] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const fetchSecureLink = useCallback(async () => {
    try {
      setGenerating(true);
      const { data } = await api.getSecureSharingLink(id);
      setSecureLink(data.url);
    } catch (error) {
      console.error("Generating secure link failed", error);
    } finally {
      setGenerating(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSecureLink();
  }, [fetchSecureLink]);

  return (
    <div className=" w-[30vw] text-sm flex flex-col gap-4 items-center mx-auto p-5">
      {generating ? <p>Generating Secure Link for this licence</p> : null}
      {generating ? <Loader2 className=" text-blue-400 animate-spin" /> : null}
      {!generating && (
        <div className="flex items-center">
          <a
            className=" bg-blue-200 p-1 px-2 h-8 rounded-l-md border border-r-0 border-blue-300 underline"
            href={secureLink}
            target="_blank"
          >
            {secureLink}
          </a>
          <Button variant="SECONDARY" className="!rounded-l-none">
            {copied ? (
              <div className=" text-green-400 flex gap-1 items-center">
                <CheckCheck className="size-3" />
                <span>copied</span>
              </div>
            ) : (
              <Tooltip title="copy to clipboard">
                <Copy
                  className="size-3 cursor-pointer"
                  onClick={() => {
                    setCopied(true);
                    copytoClipboard(secureLink);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </Tooltip>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
