import axios, { AxiosError } from 'axios';
import { ErrorType } from './models/error';

export class ApiService {
  private instance = axios.create({
    // Base URL and other configuration options
  });

  async get<T>(url: string) {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorType>;
      if (axiosError?.response?.data) {
        throw {
          message: axiosError.response.data.message,
          myStatusCode: axiosError.response.status.toString(),
        } as ErrorType;
      } else {
        throw {
          message: 'An error occurred',
          myStatusCode: '500',
        } as ErrorType;
      }
    }
  }

  async weMet<T>(url: string) {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorType>;
      if (axiosError.response?.data) {
        throw {
          message: axiosError.response.data.message,
          statusCode: axiosError.response.status.toString(),
        };
      } else {
        throw {
          message: 'Something went wrong',
          statusCode: '500',
        };
      }
    }
  }

  async post<T>(url: string, data: any) {
    try {
      const response = await axios.post<T>(url, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorType>;
      if (axiosError?.response?.data) {
        throw new Error(axiosError.response.data.message);
      } else {
        throw new Error('An Error Occured');
      }
    }
  }

  // Add methods for other HTTP request methods as needed
}
