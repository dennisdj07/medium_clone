import { useState } from "react";
import { type SignupValidate } from "@dennisjsh07/medium-common";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import LabeledInput from "./LabeledInput";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Form = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupValidate>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequset() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", JSON.stringify(jwt));
      navigate("/blogs");
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="bg-red-200 h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <Heading
              label={type === "signup" ? "Create an account" : "Login"}
            />
            <SubHeading
              label={
                type === "signup"
                  ? "already have an account?"
                  : "Don't have an account?"
              }
              type={type === "signup" ? "signup" : "signin"}
            />
          </div>
          {type === "signup" ? (
            <LabeledInput
              label={"Name :"}
              type={"text"}
              placeholder={"Full Name"}
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          ) : null}
          <LabeledInput
            label={"Email :"}
            type={"text"}
            placeholder={"email"}
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />
          <LabeledInput
            label={"Password :"}
            type={"passowrd"} // set stars in input...
            placeholder={"password"}
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />
          <Button
            onClick={sendRequset}
            label={type === "signup" ? "Sign Up" : "Sign In"}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
