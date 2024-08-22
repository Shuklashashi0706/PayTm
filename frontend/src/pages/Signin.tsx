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
    <div className=" flex items-center justify-center h-screen border border-black">
      <div className=" border border-black w-[80%] h-[20rem] lg:w-[30rem] lg:h-[40rem] ">
        <Heading text={"Signin"} />
        <SubHeading text={"Enter your credentials to access your account"} />
        <InputBox ref={inputRef} heading="Email" placeholder="Email..." />
        <InputBox heading="Password" placeholder="Password.." />
        <SubmitBtn text="Submit" />
        <BottomWarning text1="Didnt have an account?" text2="Sign up" link="/" />
      </div>
    </div>
  );
};

export default Signin;
