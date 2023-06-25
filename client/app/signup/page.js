"use client";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const login = document.getElementById("login");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    login.addEventListener("click", () => {
      if (email.value === "") {
        // Create the error div element
        const errorDiv = document.createElement("div");
        errorDiv.id = "error";
        errorDiv.className =
          "bg-red-300 text-red-700 rounded-lg w-96 h-10 text-center mt-6 flex items-center justify-center";

        // Create the h1 element
        const errorMessage = document.createElement("h1");
        errorMessage.textContent = "No Email Provided.";

        // Append the h1 element to the error div
        errorDiv.appendChild(errorMessage);

        // Append the error div to the desired parent element
        const parentElement = document.getElementById("some");
        parentElement.appendChild(errorDiv);
        return;
      }

      fetch("http://localhost:5000/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          Email: email.value,
          Username: username.value,
          Password: password.value,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const errorDiv = document.createElement("div");
          errorDiv.id = "error";
          if (data.Error) {
            errorDiv.className =
              "bg-red-300 text-red-700 rounded-lg w-96 h-10 text-center mt-6 flex items-center justify-center";
            const errorMessage = document.createElement("h1");
            errorMessage.textContent = JSON.stringify(data.Error);
            errorDiv.appendChild(errorMessage);
            const parentElement = document.getElementById("some");
            parentElement.appendChild(errorDiv);
          } else if (data.Success) {
            errorDiv.className =
              "bg-green-300 text-green-700 rounded-lg w-96 h-10 text-center mt-6 flex items-center justify-center";
            const errorMessage = document.createElement("h1");
            errorMessage.textContent = JSON.stringify("Account created. Re-directing...");
            errorDiv.appendChild(errorMessage);
            const parentElement = document.getElementById("some");
            parentElement.appendChild(errorDiv);
            window.localStorage.setItem("token-monitor", data.Success);
            window.location.href = "http://localhost:3000/dashboard"
          } else {
            console.log("???");
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
          Sign Up
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            id="email"
            type="email"
            className="rounded-lg bg-green-300 text-green-700 px-10 py-4 outline-none"
            placeholder="Enter an email"
          />
          <input
            id="username"
            type="text"
            className="rounded-lg bg-green-300 text-green-700 px-10 py-4 outline-none"
            placeholder="Choose a username"
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
            className="text-lg md:text-2xl hover:bg-green-700 hover:text-green-300 transition-all text-green-700 bg-green-300 font-medium px-6 py-3 rounded-lg"
          >
            Sign Up
          </button>
        </div>
        <div id="some"></div>
      </div>
    </div>
  );
}
