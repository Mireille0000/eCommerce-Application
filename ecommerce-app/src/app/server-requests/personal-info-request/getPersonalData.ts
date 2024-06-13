import { ProcessEnv } from '../registration-form-request/BuildClient';

const projectKey = ProcessEnv.CTP_PROJECT_KEY as string;
const apiUrl = ProcessEnv.CTP_API_URL as string;

class CustomerLoader {
  private token: string;

  constructor() {
    this.token = this.getToken();
  }

  private getToken() {
    const dataToken = localStorage.getItem('data');
    const currToken = dataToken
      ? JSON.parse(localStorage.getItem('data') as string).access_token
      : JSON.parse(sessionStorage.getItem('data') as string).access_token;
    return currToken;
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      throw new Error(res.statusText);
    }
    return res;
  }

  private async load(endpoint: string) {
    const url = `${apiUrl}/${projectKey}${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this.errorHandler.bind(this))
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));

    return response;
  }

  public getCustomerData() {
    return this.load('/me');
  }
}

export default CustomerLoader;
