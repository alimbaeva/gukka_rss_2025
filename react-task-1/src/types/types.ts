export interface ButtonSimpleProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  cusomStyle?: string;
  ariaLabe: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonIconProps extends Omit<ButtonSimpleProps, 'text'> {
  before?: boolean;
  after?: boolean;
  pathIcon: string;
  text?: string;
}

export interface InputProps {
  type: string;
  label?: string;
  placeholder: string;
  value: string;
  ariaLabe: string;
  required?: boolean;
  onChange?: (arg: string) => void;
}

export interface AuthorsList {
  id: string;
  name: string;
  removed?: boolean;
}

export interface Authors {
  authors: string[];
}

export interface CreationCourse extends Authors {
  id: string;
  creationDate: string;
  duration: number;
}
export interface ActionCardProps extends CreationCourse {
  id: string;
  creationDate: string;
  duration: number;
  removeItem: (arg: string) => void;
}

export interface CoursesListType extends CreationCourse {
  title: string;
  description: string;
}

export interface CardProps extends CoursesListType {
  title: string;
  description: string;
  removeItem: (arg: string) => void;
}

export interface RenderAuthProps {
  authors: string[];
}

export interface CourseFormData {
  title: string;
  description: string;
  duration: number;
  authorName?: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface CourseData {
  title: string;
  description: string;
  duration: number;
  creationDate: number;
  authors: string[];
}

export interface AuthListItemType {
  title?: string;
  authList?: AuthorsList[];
  auth?: AuthorsList;
  selects?: boolean;
}
