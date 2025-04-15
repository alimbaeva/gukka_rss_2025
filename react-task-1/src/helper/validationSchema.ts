import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(4, 'The name must be at least 4 characters long.')
    .regex(
      /^[a-z]+$/,
      'The name must contain only letters (no digits or symbols).'
    ),
  password: z
    .string()
    .refine(
      (val) => /^[a-z]{8,}$/.test(val),
      'The password must contain only lowercase Latin letters and must be at least 8 characters long.'
    ),
});

export const courseSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 5 characters long')
    .regex(
      /^[A-Z][a-zA-Z0-9\s\-']*$/,
      'Title must start with a capital letter and contain only Latin letters'
    ),
  description: z
    .string()
    .min(2, 'Description must be at least 30 characters long'),

  duration: z
    .number()
    .min(1, 'Duration must be at least 1 minute')
    .max(300, 'Duration cannot exceed 300 minutes'),

  authorName: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val.trim() === '' ||
        /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(val),
      {
        message:
          'Author name must start with a capital letter and contain only Latin letters and spaces',
      }
    ),
});
