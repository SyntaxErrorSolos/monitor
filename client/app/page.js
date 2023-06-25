"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=> {
    const signup = document.getElementById("signup");
    const create = document.getElementById("login");

    signup.addEventListener("click", () => {
      window.open("http://localhost:3000/signup")
    })
    create.addEventListener("click", () => {
      window.open("http://localhost:3000/login")
    })


  }, []);
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-700 text-center mb-6">
            Moniter
          </h1>
          <h2 className="text-lg md:text-3xl text-green-600 font-thin text-center mb-10">
            Create alerts to monitor your website!
          </h2>
          <div className="flex justify-center space-x-6">
            <button 
            id="login"
            className="text-lg md:text-2xl text-green-700 bg-green-300 font-medium px-6 py-3 rounded-lg">
              Login
            </button>
            <button 
            id="signup"
            className="text-lg md:text-2xl text-green-700 bg-green-300 font-medium px-6 py-3 rounded-lg">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
