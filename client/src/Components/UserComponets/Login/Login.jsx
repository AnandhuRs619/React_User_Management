import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { LoginPost } from "../../../utils/Constants";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const body = JSON.stringify({
      email,
      password,
    });
    e.preventDefault();

    if (!email || !password) {
      Swal.fire(
        "Please Fill The Feild?",
        "That thing is still around?",
        "question"
      );
    } else {
      try {
        let user = await axios.post(LoginPost, body, {
          headers: { "Content-Type": "application/json" },
        });
        if (user.data.user) {
          localStorage.setItem("token", user.data.user);
          console.log(user.data, "this is logindata");
          navigate("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Credintaials!",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-screen h-screen mx-auto flex justify-center items-center">
      <div className="w-1/2 h-1/2 md:w-[400px] border p-5 rounded-lg shadow-md">
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="mb-3 text-2xl font-serif font-bold">Login</h3>
          <input
            className="border w-full rounded p-2 mb-3 focus:outline-none"
            type="text"
            placeholder="Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="username"
          />
          <input
            className="border w-full rounded p-2 mb-4 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />

          <button
            className="w-full rounded p-2 mb-2  bg-blue-700 hover:bg-yellow-800 text-white"
            type="submit"
          >
            Log In
          </button>
          <button className="w-full rounded p-2  bg-green-500 hover:bg-red-600 text-white">
            <div className="go">
              <i className="fab fa-google"></i>{" "}
              <Link className="link text-white text-center" to={"/signup"}>
                SIGNUP
              </Link>{" "}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
