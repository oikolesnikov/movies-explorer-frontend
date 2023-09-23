import React, { useContext, useEffect } from "react";
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom';

import "./Register.css";
import { AppContext } from '../../context/app.context';

const Register = () => {

  const context = useContext(AppContext);
  const history = useHistory();

  if (JSON.parse(localStorage.getItem('user'))?.token) {
    history.push('/');
  }

  useEffect(() => {
    if (context.error) {
      toast(context.error)
      setTimeout(() => {
        context.setError('')
      }, 5000)
    }
  }, [context.error])

  return (
    <main className="register">
      <div className="register__container">
        <Logo className={"register__logo"} />
        <h1 className="register__title">Добро пожаловать!</h1>

        <AuthForm
          authTextsParams={{
            buttonCaption: "Зарегистрироваться",
            question: "Уже зарегистрированы?",
            linkCaption: "Войти",
            path: "/signin",
          }}
        >
        </AuthForm>
      </div>
      <ToastContainer/>
    </main>
  );
};

export default Register;
