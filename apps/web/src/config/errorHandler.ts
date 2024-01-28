import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function errorHandler(error: AxiosError) {
  if (error) {
    let message;
    if (error.response) {
      if (error.response?.status === 500) message = 'Something went wrong';
      else message = error.message;

      if (typeof message === 'string') {
        return toast.error(message);
      }

      return Promise.reject(error);
    }
  }
}
