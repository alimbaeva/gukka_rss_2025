import { CourseData } from '../types/types';
import { COURSES_PATH } from './variable';

export const get = async (path: string) => {
  try {
    const response = await fetch(`${COURSES_PATH}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const deleteCourse = async (path: string) => {
  try {
    const response = await fetch(`${COURSES_PATH}${path}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const updateCourse = async (path: string, data: unknown) => {
  try {
    const response = await fetch(`${COURSES_PATH}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createCourse = async (
  path: string,
  data: CourseData | { name: string }
) => {
  try {
    const response = await fetch(`${COURSES_PATH}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};
