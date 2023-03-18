import axios from "axios";

let config = {
    method: 'post',
    url: 'https://realm.mongodb.com/api/client/v2.0/app/data-nulxs/auth/providers/local-userpass/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      "username": "",
      "password": ""
    }
};

export async function authenticate(username, password) {  
    try {
      config.data = JSON.stringify({
        "username": username,
        "password": password
      });
      const response = await axios(config);
      localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
      return response.access_token;
    } catch (error) {
      throw error;
    }
  }