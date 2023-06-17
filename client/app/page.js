"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(
    () => {
      const status = document.getElementById("status");
      fetch("http://localhost:5000/fetch-art")
        .then(() => (status.innerText = "Current Status: Fetching Art"))
        .then((response) => response.json)
        .then((data) => {
          status.innerText = "Current Status: Downloading Art"
        });
    },
    // This array of dependencies will determine when the function runs
    // If the dependencies change, the function will run again
    []
  );
  return (
    <div>
      <div>
        <nav className="flex justify-end">
            <button className="bg-emerald-500 shadow-emerald-500 shadow-lg text-black font-serif px-10 py-2 rounded-full mx-5 my-5">
              Join
            </button>
        </nav>
      </div>
    <div className="flex h-screen">
      <div className="m-auto text-black font-serif">
        <h1 className="text-7xl">Rendering...Please wait</h1>
        <div className="text-center my-5">
          <h1 id="status" className="text-5xl">
            Current Status.
          </h1>
        </div>
      </div>
    </div>
    </div>
  );
}
