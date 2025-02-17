import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const CustomInput = ({ control, name, label = null, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={
                name === "password" || name === "password_confirmation"
                  ? "password"
                  : "text"
              }
              placeholder={placeholder}
              className="shadow-md focus-visible:shadow-md focus-visible:ring-blue-400 w-full focus-visible:placeholder:text-muted-foreground placeholder:text-transparent customInput"
              {...field}
            />
          </FormControl>
          <FormLabel className="top-[1.5em] left-[1.5em] absolute border-2 border-transparent text-md transition-all -translate-y-[50%] duration-300 ease-in-out pointer-events-none customLabel transform">
            {label}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
