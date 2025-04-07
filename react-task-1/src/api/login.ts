import { LoginFormValues } from '../types/types';
import { LOGIN_PATH } from './variable';

export const loginUser = async (body: LoginFormValues) => {
  const response = await fetch(LOGIN_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Invalid data');
  }

  return await response.json();
};
