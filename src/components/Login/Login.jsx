import React from "react";
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";

import "./Login.css";

const Login = () => {
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
    </main>
  );
};

export default Login;
