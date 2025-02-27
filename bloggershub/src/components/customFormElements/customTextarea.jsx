import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const CustomTextarea = ({ control, name, label = null, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full focus-visible:placeholder:text-muted-foreground placeholder:text-transparent customInput"
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

export default CustomTextarea;
