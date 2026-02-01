import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { medicalSpecialtyOptions } from "../_contants";
import { NumericFormat } from "react-number-format";

const timeToMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }
  return hours * 60 + minutes;
};

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    specialty: z.string().min(1, "Specialty is required"),
    // appointmentPrice: z.preprocess(
    //   (value) => (value === "" ? undefined : Number(value)),
    //   z
    //     .number({ error: "Appointment price is required" })
    //     .min(0, "Appointment price is required"),
    // ),
    appointmentPrice: z
      .number({ error: "Appointment price is required" })
      .min(0, "Appointment price is required"),
    availableFromWeekday: z
      .string()
      .min(1, "Available from weekday is required"),
    availableToWeekday: z.string().min(1, "Available to weekday is required"),
    availableFromTime: z.string().min(1, "Initial time is required"),
    availableToTime: z.string().min(1, "End time is required"),
  })
  .superRefine(({ availableFromTime, availableToTime }, ctx) => {
    const fromMinutes = timeToMinutes(availableFromTime);
    const toMinutes = timeToMinutes(availableToTime);

    if (fromMinutes === null || toMinutes === null) {
      return;
    }

    if (toMinutes <= fromMinutes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Available to time must be after available from time",
        path: ["availableToTime"],
      });
    }
  });

const UpserDoctorForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      specialty: "",
      appointmentPrice: undefined,
      availableFromWeekday: "1",
      availableToWeekday: "5",
      availableFromTime: "",
      availableToTime: "",
    },
  });

  return (
    <DialogContent>
      <DialogTitle>Add new Doctor</DialogTitle>
      <DialogDescription>Add a new doctor to the clinic</DialogDescription>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialty"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Specialty</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {medicalSpecialtyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Price</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value === 0 ? "" : field.value}
                    onValueChange={(value) => {
                      field.onChange(value.floatValue ?? 0);
                    }}
                    decimalScale={2}
                    fixedDecimalScale
                    decimalSeparator="."
                    allowNegative={false}
                    allowLeadingZeros={false}
                    prefix="$"
                    customInput={Input}
                    thousandSeparator=","
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromWeekday"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Initial Available Day</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                      <SelectItem value="6">Saturday</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToWeekday"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>End Available Day</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                      <SelectItem value="6">Saturday</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Time</FormLabel>

                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableToTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>

                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Add Doctor</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpserDoctorForm;
