import { Button } from "../ui/button";

const CustomButton = ({
  type = null,
  buttonText = "Submit",
  buttonStyle,
  disabled = false,
}) => {
  return (
    <Button type={type} disabled={disabled} className={buttonStyle}>
      {buttonText}
    </Button>
  );
};

export default CustomButton;
