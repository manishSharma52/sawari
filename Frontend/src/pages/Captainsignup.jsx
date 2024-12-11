import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Captainsignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [Userdata, setUserData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <h1 className="w-48 text-4xl mb-12 text-black font-bold "> SAWARI </h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-xl mb-2"> What's your name </h3>
          <div className="flex  gap-4 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
              required
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="first name"
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
              value={lastName}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              type="text"
              placeholder="last name"
            />
          </div>
          <h3 className="text-lg  mb-2"> What's your email </h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password "
          />
          <button className="bg-[#111] mb-7 rounded px-4 py-2  w-full text-lg text-white">
            {" "}
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>
      <div>
      <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>

      </div>
    </div>
  )
}

export default Captainsignup