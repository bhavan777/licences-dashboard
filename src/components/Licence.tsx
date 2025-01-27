import { LicenceItem } from "@/api";
import { licenceTypes, licenceTypesLabels } from "@/constants";
import MaskedKey from "./MaskedKey";
import { Link } from "lucide-react";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";
import { useState } from "react";
import Modal from "./ui/Modal";
import GenerateSecureLink from "./GenerateSecureLink";

export default function Licence({
  id,
  licence_type,
  licencyKey,
  hardware_id,
  expiration,
  usage_limit,
}: LicenceItem) {
  const [showSecureLinkGenerationModal, setShowSecureLinkGenerationModal] =
    useState<boolean>(false);
  return (
    <div
      className="border w-1/6 p-4 shadow-md rounded-md text-xs flex gap-2 flex-col justify-between"
      key={id}
    >
      <div className=" flex w-full justify-between items-center">
        <p>{licenceTypesLabels[licence_type]} Licence</p>
        <Button
          onClick={() => {
            setShowSecureLinkGenerationModal(true);
          }}
          variant="SECONDARY"
          className="!size-auto !p-1"
        >
          <Tooltip title="Generate Secure Link">
            <Link className="size-3" />
          </Tooltip>
        </Button>
        <Modal
          open={showSecureLinkGenerationModal}
          onClose={() => {
            setShowSecureLinkGenerationModal(false);
          }}
          title="Generate Secure Link"
        >
          <GenerateSecureLink id={id} />
        </Modal>
      </div>
      <MaskedKey unmaskedKey={licencyKey} />
      <div className="flex gap-2">
        <p className=" text-nowrap">
          {licence_type === licenceTypes.HARDWARE && "Hardware Id:"}
          {licence_type === licenceTypes.TIME_BOUND && "Expires by:"}
          {licence_type === licenceTypes.USAGE_LIMIT && "limited upto:"}
        </p>
        {licence_type === licenceTypes.HARDWARE && (
          <p className="px-1 bg-slate-300 text-xs rounded-sm max-w-[75%] truncate">
            {hardware_id}
          </p>
        )}
        {licence_type === licenceTypes.TIME_BOUND && (
          <p className="px-1 bg-slate-300 text-xs rounded-sm">
            {new Date(+(expiration ?? 0)).getDate()}/
            {new Date(+(expiration ?? 0)).getMonth() + 1}/
            {new Date(+(expiration ?? 0)).getFullYear()}
          </p>
        )}
        {licence_type === licenceTypes.USAGE_LIMIT && (
          <span className="px-1 bg-slate-300 text-xs rounded-sm">
            {usage_limit} deployments
          </span>
        )}
      </div>
    </div>
  );
}
