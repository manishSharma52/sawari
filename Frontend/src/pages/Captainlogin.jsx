import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Captainlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    setPassword("");
    setEmail("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
    <div>
      <h1 className="w-48 text-4xl mb-12 text-black font-bold "> SAWARI </h1>
      <form onSubmit={submitHandler}>
        <h3 className="text-xl mb-2"> What's your email </h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@example.com"
        />
        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password "
        />
        <button className="bg-[#111] mb-7 rounded px-4 py-2  w-full text-lg text-white">
          {" "}
          Login
        </button>
      </form>
      <p className="text-center">
        Register as a Captain{" "}
        <Link to="/captain-signup" className="text-blue-600">
          Create new Account{" "}
        </Link>{" "}
      </p>
    </div>
    <div>
      <Link to='/login' className="bg-[#FFDB30] mb-7 flex items-center justify-center rounded px-4 py-2  w-full text-lg text-slate-600">
        Sign in as User
      </Link>
    </div>
  </div>
);
  
}

export default Captainlogin