"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .email({
      pattern: z.regexes.html5Email,
      error: "Inform a valid e-mail",
    })
    .trim()
    .min(1, { error: "E-mail is required" }),
  password: z.string().min(8, {
    error: (iss) => {
      iss.minimum;
      iss.inclusive;
      return `Password must have ${iss.minimum} characters or more`;
    },
  }),
});

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Invalid credentials. Please try again.");
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Inform your credentials to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="E-mail..."
                      autoComplete="on"
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Password..."
                      autoComplete="off"
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            form="register-form"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
