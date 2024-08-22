import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SubmitBtn from "../components/Submitbtn";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

const Signin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handeSubmit = async () => {
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      const user = response.data.userRes[0];
      localStorage.setItem("user",JSON.stringify(user))
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };
  return (
    <div className="bg-cyan-100 flex items-center justify-center min-h-screen p-4 border border-black">
      <ToastContainer />
      <div className="border bg-white border-black w-full max-w-lg h-auto p-6 lg:p-8 rounded-lg">
        <Heading text="Signin" />
        <SubHeading text="Enter your credentials to access your account" />
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          ref={inputRef}
          heading="Email"
          placeholder="Email..."
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          heading="Password"
          placeholder="Password.."
        />
        <SubmitBtn onClick={handeSubmit} text="Submit" />
        <BottomWarning
          text1="Didn't have an account?"
          text2="Sign up"
          link="/"
        />
      </div>
    </div>
  );
};

export default Signin;
