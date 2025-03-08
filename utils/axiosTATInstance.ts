import axios from "axios";

const apiTAT = axios.create({
    baseURL:'https://tatdataapi.io/api/v2',
    headers: {
      'accept': '*/*',
      'Accept-Language': 'en',
      'x-api-key': 'UWeaS3gyJj9sQPt0S045Bu0vUtXcoRBs'
    }
  });
export default apiTAT;
