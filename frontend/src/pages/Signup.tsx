import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SubmitBtn from "../components/Submitbtn";
import BottomWarning from "../components/BottomWarning";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handeSubmit = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
      phoneNum: number,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        userData,
        {withCredentials:true}
      );
      console.log(response);

      if (response) {
       toast.success("Successful")
       navigate("/signin")
      }
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };

  return (
    <div className="flex bg-cyan-100 items-center justify-center min-h-screen p-4 border border-black">
      <ToastContainer />
      <div className="border bg-white rounded-lg border-black w-full max-w-lg h-auto p-6 lg:p-8">
        <Heading text="Signup" />
        <SubHeading text="Enter your information to create an account" />
        <InputBox
          ref={inputRef}
          onChange={(e) => setName(e.target.value)}
          heading="Name"
          placeholder="John"
        />
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          heading="Email"
          placeholder="Email..."
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          heading="Password"
          placeholder="Password..."
        />
        <InputBox
          onChange={(e) => setNumber(e.target.value)}
          heading="Phone Number"
          placeholder="+91..."
        />
        <SubmitBtn onClick={handeSubmit} text="Submit" />
        <BottomWarning
          text1="Already have an account?"
          text2="Sign in"
          link="signin"
        />
      </div>
    </div>
  );
};

export default Signup;
