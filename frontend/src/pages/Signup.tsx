import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SubmitBtn from "../components/Submitbtn";
import BottomWarning from "../components/BottomWarning";
import { useEffect, useRef } from "react";

const Signup = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen border border-black">
      <div className="border border-black w-[80%] h-[35rem] lg:w-[30rem] lg:h-[42rem]">
        <Heading text="Signup" />
        <SubHeading text="Enter your information to create an account" />
        <InputBox ref={inputRef} heading="Name" placeholder="John" />
        <InputBox heading="Email" placeholder="Email..." />
        <InputBox heading="Password" placeholder="Password.." />
        <InputBox heading="Phone Number" placeholder="+91..." />
        <SubmitBtn text="Submit" />
        <BottomWarning text1="Already have an account?" text2="Sign in" link="signin" />
      </div>
    </div>
  );
};

export default Signup;
