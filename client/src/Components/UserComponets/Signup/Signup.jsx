import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { signUpPost } from "../../../utils/Constants";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const body = JSON.stringify({
      userName,
      email,
      password,
    });
    e.preventDefault();

    if (!userName || !email || !password) {
      Swal.fire(
        "Please Fill the components?",
        "Do You Miss Something Here?",
        "question"
      );
    } else {
      try {
        let response = await axios.post(signUpPost, body, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.status === "ok") {
          Swal.fire("Good job!", "Signup Sucess!", "success");
          console.log(response.data);
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "User Already Registered!",
          });
          console.log("some error");
        }
      } catch (err) {
        console.log(err);
        alert(err);
        console.log("ivdaa");
      }
    }
  };

  return (
    <div className="w-screen h-screen mx-auto  flex  justify-center items-center">
      <div className="w-1/2 h-1/2 md:w-[400px] border p-5 rounded-lg shadow-md">
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="mb-3 text-2xl font-serif font-bold">Signup</h3>
          <input
            className="border w-full rounded p-2 mb-3 focus:outline-none"
            type="text"
            placeholder="userName "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
          />
          <input
            className="border w-full rounded p-2 mb-3 focus:outline-none"
            type="text"
            placeholder="Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="username"
          />
          <input
            className="border w-full rounded p-2 mb-3 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />

          <button className="w-full rounded p-2 mb-2  bg-blue-700 hover:bg-blue-800 text-white" type="submit">
            Signup{" "}
          </button>
          
            <div className="go">
              Already Have a account ?  
              <Link className="link text-center text-blue-700" to={"/"}> Login</Link>{" "}
            </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
