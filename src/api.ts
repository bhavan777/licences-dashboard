import axios, { Axios, AxiosResponse } from "axios";

export type CreateLicensePayload = {
  license_type: string;
  expiration_date?: string;
  hardware_id?: string;
  usage_limit?: string;
};

export type EncryptFilePayload = {
  file: File;
  license_key: string;
};

export type LicenceItem = {
  id: string;
  licence_type: "TIME_BOUND" | "USAGE_LIMIT" | "HARDWARE";
  licencyKey: string;
  usage_limit?: number;
  hardware_id?: string;
  expiration?: number;
};

export type EncryptionItem = {
  id: string;
  encryptedFile: HTMLImageElement;
};
class Api {
  private client: Axios;
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8080",
    });
  }

  createLicense = (data: CreateLicensePayload): Promise<string> => {
    return this.client.post("/createLicense", data);
  };

  encryptFile = (
    data: FormData
  ): Promise<AxiosResponse<{ id: string; file: File }>> => {
    return this.client.post("/encryptFile", data);
  };

  getSecureSharingLink = (
    id: string
  ): Promise<AxiosResponse<{ url: string }, unknown>> => {
    return this.client.post(`/generateLink`, { id });
  };
  getLicences = (): Promise<AxiosResponse<LicenceItem[], unknown>> => {
    return this.client.get("/licences");
  };

  getEncryptions = (): Promise<AxiosResponse<LicenceItem[], unknown>> => {
    return this.client.get("/encryptions");
  };
}

const api = new Api();
export default api;
