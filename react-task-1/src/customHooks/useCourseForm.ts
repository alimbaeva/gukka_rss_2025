import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../helper/validationSchema';
import { CourseFormData } from '../types/types';

export const useCourseForm = () => {
  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'onChange',
  });

  const { watch } = form;
  const [duration, authorName] = watch(['duration', 'authorName']);

  return { ...form, duration, authorName };
};
