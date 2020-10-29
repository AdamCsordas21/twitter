import React, { FC, useState } from "react";
import { User } from "./index";

interface LoginPageProps {
  logInFunc: LogInFunc;
}

const LoginPage: FC<LoginPageProps> = ({ logInFunc }) => {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(true)
  return (
    <form
      data-testid="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        const result = logInFunc(user, pass);
        setSuccess(!!result)
      }}
    >
      {!success && <div>Invalid user credentials</div>}
      <label>
        user{" "}
        <input
          placeholder="user"
          type="text"
          name="user"
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <label>
        pass{" "}
        <input
          placeholder="password"
          type="password"
          name="pass"
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <input type="submit" value="log in" />
    </form>
  );
};

type LogInFunc = (user: string, pass: string) => User | null;

export interface WithAuthenticationProps {
  logInFunc: LogInFunc;
}

export const WithAuthentication: FC<WithAuthenticationProps> = ({
  children,
  logInFunc,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const myLogInFunc: LogInFunc = (user, pass) => {
    const result: User | null = logInFunc(user, pass)
    setUser(result);
    return result
  };
  return user !== null ? <>{children}</> : <LoginPage logInFunc={myLogInFunc} />;
};
