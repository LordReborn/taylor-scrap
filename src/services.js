import axios from "axios";
import { settings } from "./settings.js";

export const sendMessages = ({ test }) =>
  settings.phones.map((phone) =>
    axios({
      headers: { Authorization: `Bearer ${settings.apiToken}` },
      method: "post",
      url: `https://graph.facebook.com/v17.0/${settings.numberId}/messages`,
      data: {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: test ? "hello_world" : "hay_entradas_disponibles",
          language: {
            code: test ? "en_US" : "es_AR",
          },
        },
      },
    })
  );
