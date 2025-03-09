import axios from "axios";

const apiTAT = axios.create({
    baseURL:'https://tatdataapi.io/api/v2',
    headers: {
      'accept': '*/*',
      'Accept-Language': 'en',
      'x-api-key': '80JkXNR5DiYWslw5NoR4gGVatS3GKw9G'
    }
  });
export default apiTAT;
