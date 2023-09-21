import React, {useContext, useEffect} from "react";
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";
import {ToastContainer, toast} from 'react-toastify';
import { AppContext } from '../../context/app.context';
import 'react-toastify/dist/ReactToastify.css';

import "./Login.css";

const Login = () => {

  const context = useContext(AppContext);

  useEffect(() => {
    if (context.error) {
      toast(context.error)
      setTimeout(() => {
        context.setError('')
      }, 5000)
    }
  }, [context.error, context])

  return (
    <main className="login">
      <div className="login__container">
        <Logo className={"login__logo"} />
        <h1 className="login__title">Рады видеть!</h1>

        <AuthForm
          authTextsParams={{
            buttonCaption: "Войти",
            question: "Ещё не зарегистрированы?",
            linkCaption: "Регистрация",
            path: "/signup",
          }}
        />
      </div>
      <ToastContainer/>
    </main>
  );
};

export default Login;
