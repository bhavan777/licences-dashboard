import api, { LicenceItem } from "@/api";
import { licenceTypes, licenceTypesLabels } from "@/constants";
import { useEffect, useState } from "react";
import MaskedKey from "./MaskedKey";
import Button from "./ui/Button";
import { Plus } from "lucide-react";
import Modal from "./ui/Modal";
import CreateLicence from "./CreateLicence";
import CreateEncryption from "./CreateEncryption";
import Licence from "./Licence";

export default function LicenceManagement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [refetching, setRefetching] = useState<boolean>(false);
  const [licences, setLicences] = useState<LicenceItem[]>([]);
  const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
  const [showEncryptionModal, setShowEncryptionModal] =
    useState<boolean>(false);
  const fetchLicences = async (isFetching: boolean) => {
    if (isFetching) {
      setRefetching(true);
    } else {
      setLoading(true);
    }
    try {
      const { data } = await api.getLicences();
      setLicences(data);
    } catch (error) {
      console.error(error);
    } finally {
      if (isFetching) {
        setRefetching(false);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchLicences(false);
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-3 items-center">
        <h2>Licences</h2>
        <Button
          onClick={() => {
            setShowCreationModal(true);
          }}
        >
          <Plus className=" size-4" />
          Create new Licence
        </Button>

        <Button
          onClick={() => {
            setShowEncryptionModal(true);
          }}
        >
          <Plus className=" size-4" />
          Create New Encryption
        </Button>
      </div>
      <Modal
        open={showCreationModal}
        onClose={() => {
          setShowCreationModal(false);
        }}
        title="Create Licence"
      >
        <CreateLicence
          onCancel={() => {
            setShowCreationModal(false);
          }}
          onSuccess={() => {
            fetchLicences(true);
          }}
        />
      </Modal>

      <Modal
        open={showEncryptionModal}
        onClose={() => {
          setShowEncryptionModal(false);
        }}
        title="Create Encryption"
      >
        <CreateEncryption
          onCancel={() => {
            setShowEncryptionModal(false);
          }}
        />
      </Modal>

      <div className="flex gap-4 my-4">
        {loading ? (
          <>
            <div className="border w-1/6 p-4 shadow-md rounded-md text-xs h-[102px] animate-pulse bg-blue-100" />
            <div className="border w-1/6 p-4 shadow-md rounded-md text-xs h-[102px] animate-pulse bg-blue-100" />
            <div className="border w-1/6 p-4 shadow-md rounded-md text-xs h-[102px] animate-pulse bg-blue-100" />
          </>
        ) : null}
        {!loading && licences.map((licence) => <Licence {...licence} />)}
        {refetching && (
          <div className="border w-1/6 p-4 shadow-md rounded-md text-xs h-[102px] animate-pulse bg-blue-100" />
        )}
      </div>
    </div>
  );
}
