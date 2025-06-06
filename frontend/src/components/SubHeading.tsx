import { Link } from "react-router-dom";

interface Subheading {
  label: string;
  type: "signin" | "signup";
}
const SubHeading = ({ label, type }: Subheading) => {
  return (
    <div className="flex justify-center mt-2">
      <div>{label}</div>
      <Link
        className="pl-2 underline"
        to={type === "signup" ? "/signin" : "/signup"}
      >
        {type === "signup" ? "signin" : "signup"}
      </Link>
    </div>
  );
};

export default SubHeading;
