import axios from "axios";

const apiTAT = axios.create({
    baseURL:'https://tatdataapi.io/api/v2',
    headers: {
      'accept': '*/*',
      'Accept-Language': 'th',
      'x-api-key': 'API-KEY-HERE'
    }
  });
export default apiTAT;
