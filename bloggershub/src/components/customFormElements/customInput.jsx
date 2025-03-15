import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CustomInput = ({ control, name, label = null, placeholder }) => {
  const [inputVal, setInputVal] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  const handleChangeCapture = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    if (inputVal !== "") {
      setInputFocus(true);
    } else {
      setInputFocus(false);
    }
  }, [inputVal]);

  useEffect(() => {
    if (name === "dob") {
      setInputFocus(true);
    }
  }, [name]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {name === "dob" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) =>
                      field.onChange(
                        date ? date.toUTCString().substring(5, 16) : ""
                      )
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Input
                type={
                  name === "password" || name === "password_confirmation"
                    ? "password"
                    : name === "phoneNumber"
                    ? "tel"
                    : "text"
                }
                placeholder={placeholder}
                className="shadow-md focus-visible:shadow-md focus-visible:ring-[#bec44d] w-full focus-visible:placeholder:text-muted-foreground placeholder:text-transparent customInput"
                onChangeCapture={(e) => handleChangeCapture(e)}
                onInput={
                  name === "phoneNumber"
                    ? (e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\D/g,
                          ""
                        ); // Removes non-numeric characters
                      }
                    : null
                }
                maxLength={name === "phoneNumber" ? 10 : Infinity} // Prevents more than 10 digits for phone number
                inputMode={name === "phoneNumber" ? "numeric" : ""} // Shows numeric keyboard on mobile
                {...field}
              />
            )}
          </FormControl>
          <FormLabel
            className={`top-[1.5em] left-[1.5em] absolute border-2 border-transparent text-md transition-all -translate-y-[50%] duration-300 ease-in-out pointer-events-none customLabel transform ${
              inputFocus && "-top-[0.5px] bg-white border-b-[#bec44d]"
            }`}
          >
            {label}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
