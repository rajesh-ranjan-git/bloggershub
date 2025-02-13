import { Textarea } from "../ui/textarea";

const CustomTextarea = ({ label = null, placeholder }) => {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        className="shadow-md focus-visible:shadow-md focus-visible:ring-blue-400 w-full"
      />
    </>
  );
};

export default CustomTextarea;
