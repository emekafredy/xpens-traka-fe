import { toast } from 'react-toastify';
import { ErrorResponse } from '../interfaces/common';

export const returnError = (
	error: unknown
): { error: ErrorResponse; success: boolean; } => {
	return { error: error as ErrorResponse, success: false };
};

const formatErrorMessage = (result: ErrorResponse | undefined): string => {
	const err = result?.response.data.status.message;

  if (err) {
    return err;
  }

  return 'Something went wrong';
}

export const renderErrorMessage = (error: ErrorResponse | undefined) => {
  const message = formatErrorMessage(error);
  toast.error(message);
};

export const renderSuccessMessage = (
  message: string
): void => {
  toast.success(message);
};

export const addCommasToNumbers = (n: number | string) => {
  return `₦${n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` || '';
}
