"use client";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const login = document.getElementById("login");
    const reset = document.getElementById("reset");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    login.addEventListener("click", () => {
      fetch("http://localhost:5000/login", {
        method: "POST",
        mode: "cors",
        headers: {
          email: email.value,
          password: password.value,
        },
      })
        .then((response) => response.json)
        .then((data) => {
          console.log(JSON.stringify(data));
          console.log(data)
          if (data.Error) {
            const errorDiv = document.createElement("div");
            errorDiv.id = "error";
            errorDiv.className =
              "bg-red-300 text-red-700 rounded-lg w-96 h-10 text-center mt-6 flex items-center justify-center";
            const errorMessage = document.createElement("h1");
            errorMessage.textContent = "Error - Please check the console!";
            errorDiv.appendChild(errorMessage);
            const parentElement = document.getElementById("some");
            parentElement.appendChild(errorDiv);
            console.log(JSON.stringify(data.Error));
          } else if (data.Succsess) {
            const check = window.localStorage.getItem("monitor");
            if (check !== null)
              return window.open("http://localhost:3000/dashboard");
            else window.open("http://localhost:3000/dashboard");
            window.localStorage.setItem(
              "token-monitor",
              `${JSON.stringify(data.Sucess)}`
            );
          }
        })
        .catch((err) => {
          const errorDiv = document.createElement("div");
          errorDiv.id = "error";
          errorDiv.className =
            "bg-red-300 text-red-700 rounded-lg w-96 h-10 text-center mt-6 flex items-center justify-center";
          const errorMessage = document.createElement("h1");
          errorMessage.textContent = "Error - Please check the console!";
          errorDiv.appendChild(errorMessage);
          const parentElement = document.getElementById("some");
          parentElement.appendChild(errorDiv);
          console.log(err);
        });
    });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 text-center mb-6">
          Login
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            id="email"
            type="email"
            className="rounded-lg bg-green-300 text-green-700 px-10 py-4 outline-none"
            placeholder="Enter an email"
          />
          <input
            id="password"
            type="password"
            className="rounded-lg bg-green-300 text-green-700 px-10 py-4 outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center space-x-6 mt-6">
          <button
            id="login"
            className="text-lg md:text-2xl text-green-700 bg-green-300 font-medium px-6 py-3 rounded-lg"
          >
            Login
          </button>
          <button
            id="reset"
            className="text-lg md:text-2xl text-red-700 bg-red-300 font-medium px-6 py-3 rounded-lg"
          >
            Reset
          </button>
        </div>
        <div id="some"></div>
      </div>
    </div>
  );
}
