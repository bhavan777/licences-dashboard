import { licenceTypes } from "@/constants";
import { readFileSync } from "fs";
import { delay, http, HttpResponse } from "msw";
import { v6 as uuid } from "uuid";

const licences = [
  {
    id: uuid(),
    licencyKey: uuid(),
    licence_type: licenceTypes.TIME_BOUND,
    expiration: new Date().getTime(),
  },
  {
    id: uuid(),
    licencyKey: uuid(),
    licence_type: licenceTypes.USAGE_LIMIT,
    usage_limit: Math.ceil(Math.random() * 100),
  },
  {
    id: uuid(),
    licencyKey: uuid(),
    licence_type: licenceTypes.HARDWARE,
    hardware_id: uuid(),
  },
];

export const handlers = [
  http.get("http://localhost:8080/licences", async () => {
    await delay(3000 * Math.random());
    return HttpResponse.json(licences);
  }),

  http.post("http://localhost:8080/createLicense", async ({ request }) => {
    const data = (await request.json()) as Record<string, string>;
    const newLicence = {
      id: uuid(),
      licencyKey: uuid(),
      ...data,
    };
    await delay(3000 * Math.random());
    licences.push(newLicence);
    return new HttpResponse();
  }),
  http.post("http://localhost:8080/encryptFile", async () => {
    const buffer = await fetch(`../../public/img.jpg`).then((response) =>
      response.arrayBuffer()
    );
    await delay(3000 * Math.random());

    // Some crazy encryption by a good backend developer happens here,
    const file = HttpResponse.arrayBuffer(buffer, {
      headers: {
        "Content-Type": "image/jpg",
      },
    });

    return HttpResponse.json({ id: uuid(), file });
  }),
  http.post("http://localhost:8080/generateLink", async ({ request }) => {
    const { id } = request.json();
    await delay(3000 * Math.random());
    return HttpResponse.json({
      url: "https://short.ly/" + uuid() + ".jpg",
    });
  }),
  http.get("/*", async () => {}),
];
