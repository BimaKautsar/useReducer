import { login } from "../../services/auth.service";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/product.service";

const FormLogin = () => {
const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    // localStorage.setItem("email",event.target.email.value);
    // localStorage.setItem("password",event.target.password.value);
    // window.location.href = "/products";
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
        console.log(res.response.data);
      }
    });
  };
  const usernameRef = useRef(null);

  useEffect(() => {
     usernameRef.current.focus();
  }, []);
    return (
      <form onSubmit={handleLogin}>
        <InputForm
          label="Username"
          placeholder="mang Ujang"
          type="text"
          name="username"
          ref={usernameRef}
        />
        <InputForm
          label="Password"
          name="password"
          type="password"
          placeholder="********"
        />
        <Button
          classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          Login
        </Button>
        {loginFailed && <p className="text-red-500 text-center mt-5">{loginFailed}</p>}
      </form>
    );
};

export default FormLogin;