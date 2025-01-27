import { FormEvent, useCallback, useState } from "react";
import Button from "./ui/Button";
import api from "@/api";
import { CheckCheck, Copy, Loader2 } from "lucide-react";
import { copytoClipboard } from "@/utils";

export default function CreateEncryption({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [encryptionId, setEncryptionId] = useState<string>("");
  const [secureLink, setSecureLink] = useState<string>("");
  const [generatingSecureLink, setGeneratingSecureLink] =
    useState<boolean>(false);
  const [encypting, setEncrypting] = useState<boolean>(false);
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const errors: Record<string, string> = {};
      let hasErrors = false;

      if (!key) {
        errors.key = "Licence Key is required";
        hasErrors = true;
      }
      if (!file) {
        errors.file = "File to Encrypt is required";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(errors);
        return;
      }

      try {
        setEncrypting(true);
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("licence_key", "somekey");
          const { data } = await api.encryptFile(formData);
          const blob = new Blob([data.file], { type: "image/jpg" });
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "encrypted-file.jpg";
          document.body.append(anchor);
          anchor.click();
          setEncryptionId(data.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setEncrypting(false);
      }
    },
    [file, setErrors, key, setEncrypting]
  );

  const generateSecureLink = useCallback(async () => {
    try {
      setGeneratingSecureLink(true);
      const { data } = await api.getSecureSharingLink(encryptionId);
      setSecureLink(data.url);
    } catch (error) {
      console.log("Secure link generation failed", error);
    } finally {
      setGeneratingSecureLink(false);
    }
  }, [encryptionId]);

  if (encryptionId) {
    return (
      <div className=" w-[30vw] text-sm flex flex-col gap-4 items-center mx-auto p-5">
        Encrypted File Created with file Id: {encryptionId}
        {secureLink ? (
          <div className=" text-blue-400 flex gap-1 items-center bg-blue-100 p-2">
            <a href={secureLink} target="_blank" className=" underline">
              {secureLink}
            </a>
            {copied ? (
              <span className=" text-green-400 flex gap-1 items-center mx-2">
                <CheckCheck className="size-4" />
                Copied
              </span>
            ) : (
              <Copy
                className="size-4 cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => {
                  copytoClipboard(secureLink);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            )}
          </div>
        ) : (
          <Button onClick={generateSecureLink}>
            {generatingSecureLink ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            {generatingSecureLink
              ? "Generatig Secure Sharing link"
              : "Generate Secure Share Link for this file"}
          </Button>
        )}
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[30vw] text-sm flex flex-col gap-4 items-center mx-auto p-5"
    >
      <div className="flex gap-4 w-full items-start">
        <label className="w-32 leading-8 text-right">Licence Key:</label>
        <div className="flex flex-col gap-2 w-full">
          <input
            className="w-full border shadow-sm rounded-md !outline-0 px-1 !h-8"
            placeholder="Licence Key"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
          {errors.key && (
            <span className=" text-red-400 text-xs">{errors.key}</span>
          )}
        </div>
      </div>
      <div className="flex gap-4 w-full items-start">
        <label className="w-32 leading-8 text-right">File to encrypt:</label>
        <div className="flex flex-col gap-2 w-full">
          <input
            className="w-full border shadow-sm rounded-md !outline-0 px-1 !h-8"
            placeholder="Licence Key"
            type="file"
            accept="image/jpg"
            //   value={file}
            onChange={(e) => {
              setFile(e.target?.files[0] ?? null);
            }}
          />
          {errors.file && (
            <span className=" text-red-400 text-xs">{errors.file}</span>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end gap-4">
        <Button disabled={encypting} variant="SECONDARY" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={encypting}>
          {encypting ? <Loader2 className="size-3 animate-spin" /> : null}
          {encypting ? "Encrypting" : "Encrypt"}
        </Button>
      </div>
    </form>
  );
}
