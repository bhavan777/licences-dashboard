import { licenceTypes, licenceTypesLabels } from "@/constants";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Button from "./ui/Button";
import api, { CreateLicensePayload } from "@/api";
import { Loader2 } from "lucide-react";

type CreateLicenceProps = {
  onCancel: () => void;
  onSuccess: () => void;
};
export default function CreateLicence({
  onCancel,
  onSuccess,
}: CreateLicenceProps) {
  const [licenceType, setLicenceType] = useState(licenceTypes.HARDWARE);
  const [hardwareId, setHardwareId] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [usageLimit, setUsageLimit] = useState<string>("");
  const [creatingLicence, setCreatingLicence] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setCreatingLicence(true);
      const body: Record<string, string> = { licence_type: licenceType };
      const errorObj: Record<string, string> = {};
      let hasErrors = false;
      if (licenceType === licenceTypes.HARDWARE) {
        if (hardwareId === "") {
          errorObj.hardware_id = "Hardware Id | MAC address are required";
          hasErrors = true;
        } else {
          errorObj.hardware_id = "";
        }
      }
      if (licenceType === licenceTypes.TIME_BOUND) {
        if (expiration === "") {
          errorObj.expiration = "expiration is required";
          hasErrors = true;
        } else if (new Date(expiration).getTime() < new Date().getTime()) {
          errorObj.expiration = "expiration cannot be in the past";
          hasErrors = true;
        } else {
          errorObj.expiration = "";
        }
      }
      if (licenceType === licenceTypes.USAGE_LIMIT) {
        if (usageLimit === "") {
          hasErrors = true;
          errorObj.usage_limit = "usageLimit is required";
        } else if (+usageLimit <= 0) {
          hasErrors = true;
          errorObj.usage_limit = "usageLimit needs to be a positive quantity";
        } else {
          errorObj.usage_limit = "";
        }
      }

      if (hasErrors) {
        setErrors(errorObj);
        setCreatingLicence(false);
        return;
      } else {
        setErrors({});
      }

      if (licenceType === licenceTypes.HARDWARE) {
        body.hardware_id = hardwareId;
      } else if (licenceType === licenceTypes.TIME_BOUND) {
        body.expiration = new Date(expiration).getTime().toString();
      } else if (licenceType === licenceTypes.USAGE_LIMIT) {
        body.usage_limit = usageLimit;
      }

      try {
        await api.createLicense(body as CreateLicensePayload);
        onSuccess();
        onCancel();
      } catch (error) {
        console.error(error);
      }
    },
    [
      licenceType,
      hardwareId,
      expiration,
      usageLimit,
      setCreatingLicence,
      setErrors,
      onSuccess,
      onCancel,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[25vw] text-sm flex flex-col gap-4 items-center mx-auto p-5"
    >
      <div className="flex gap-4 w-full items-center">
        <label className="w-32 text-right">Licence Type:</label>
        <select
          className="w-full flex-1 border shadow-sm rounded-md px-1 !outline-none !h-8"
          value={licenceType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setLicenceType(e.target.value as licenceTypes);
          }}
        >
          <option value={licenceTypes.HARDWARE}>
            {licenceTypesLabels[licenceTypes.HARDWARE]}
          </option>
          <option value={licenceTypes.TIME_BOUND}>
            {licenceTypesLabels[licenceTypes.TIME_BOUND]}
          </option>
          <option value={licenceTypes.USAGE_LIMIT}>
            {licenceTypesLabels[licenceTypes.USAGE_LIMIT]}
          </option>
        </select>
      </div>
      {licenceType === licenceTypes.HARDWARE ? (
        <div className="flex gap-4 w-full items-start">
          <label className="!leading-8 w-32 text-right">Hardware Id:</label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              className="w-full border shadow-sm rounded-md !outline-0 px-1 !h-8"
              placeholder="hardware Id | MAC address"
              value={hardwareId}
              onChange={(e) => {
                setHardwareId(e.target.value);
              }}
            />
            {errors.hardware_id && (
              <span className=" text-red-400 text-xs">
                {errors.hardware_id}
              </span>
            )}
          </div>
        </div>
      ) : null}
      {licenceType === licenceTypes.TIME_BOUND ? (
        <div className="flex gap-4 w-full items-start">
          <label className="!leading-8 w-32 text-right">Expiration Date:</label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              className="w-full border shadow-sm rounded-md !outline-0 px-1 !h-8"
              type="date"
              placeholder="expires in"
              value={expiration}
              onChange={(e) => {
                setExpiration(e.target.value);
              }}
            />
            {errors.expiration && (
              <span className=" text-red-400 text-xs">{errors.expiration}</span>
            )}
          </div>
        </div>
      ) : null}
      {licenceType === licenceTypes.USAGE_LIMIT ? (
        <div className="flex gap-4 w-full items-start">
          <label className="!leading-8 w-32 text-right">Usage Limit:</label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              className="w-full border shadow-sm rounded-md !outline-0 px-1 !h-8"
              type="number"
              placeholder="deployments"
              value={usageLimit}
              onChange={(e) => {
                setUsageLimit(e.target.value);
              }}
            />
            {errors.usage_limit && (
              <span className=" text-red-400 text-xs">
                {errors.usage_limit}
              </span>
            )}
          </div>
        </div>
      ) : null}
      <div className="flex w-full justify-end gap-4">
        <Button
          disabled={creatingLicence}
          variant="SECONDARY"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={creatingLicence}>
          {creatingLicence ? <Loader2 className="size-3 animate-spin" /> : null}
          {creatingLicence ? "Creating" : "Create"}
        </Button>
      </div>
    </form>
  );
}
