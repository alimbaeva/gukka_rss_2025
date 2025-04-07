import { SubmitHandler, useForm } from 'react-hook-form';
import ButtonSimple from '../../components/ui/buttons/Button';
import InputField from '../../components/ui/inputs/InputFeald';
import InputPassword from '../../components/ui/inputs/InputPassword';
import { LoginFormValues } from '../../types/types';
import './login.scss';
import { loginUser } from '../../api/login';
import { useSearch } from '../../components/context/useSearch';
import { saveToLocalStorage } from '../../customHooks/localActions';
import { useNavigate } from 'react-router-dom';
import { loginFormSchema } from '../../helper/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useSearch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setUserData({
        name: res.firstName,
        accessToken: res.accessToken,
      });
      saveToLocalStorage('userData', {
        name: res.firstName,
        accessToken: res.accessToken,
      });
      navigate('/courses', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container">
      <h1 className="title-page">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <InputField
          forInput="username"
          label="Username"
          type="text"
          warnText="Enter your username"
          register={register}
          errors={errors}
        />
        <InputPassword
          forInput="password"
          label="Password"
          warnText="Enter your password"
          register={register}
          errors={errors}
        />
        <ButtonSimple
          disabled={!isValid}
          text={'Login'}
          ariaLabe={'Search button'}
          type="submit"
        />
      </form>
    </section>
  );
};

export default Login;
