import { useRef,useEffect } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SubmitBtn from "../components/Submitbtn";
import BottomWarning from "../components/BottomWarning";
const Signin = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="bg-cyan-100 flex items-center justify-center min-h-screen p-4 border border-black">
    <div className="border bg-white border-black w-full max-w-lg h-auto p-6 lg:p-8 rounded-lg">
      <Heading text="Signin" />
      <SubHeading text="Enter your credentials to access your account" />
      <InputBox ref={inputRef} heading="Email" placeholder="Email..." />
      <InputBox heading="Password" placeholder="Password.." />
      <SubmitBtn text="Submit" />
      <BottomWarning text1="Didn't have an account?" text2="Sign up" link="/" />
    </div>
  </div>
  
  );
};

export default Signin;
