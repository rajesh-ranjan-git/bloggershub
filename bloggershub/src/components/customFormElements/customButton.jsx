import { Button } from "@/components/ui/button";

const CustomButton = ({
  type = null,
  buttonText = "Submit",
  buttonStyle,
  customButtonAction = () => {},
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={buttonStyle}
      onClick={customButtonAction}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
