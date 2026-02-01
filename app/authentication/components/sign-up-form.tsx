"use client";

import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  EyeOffIcon,
  Loader,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
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

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError(context) {
            if (
              context.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
            ) {
              toast.error("E-mail already in use. Please use another e-mail.");
              return;
            }

            toast.error(
              context.error.message || "An error occurred during sign-up.",
            );
          },
        },
      );
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Create new account</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Name..."
                      autoComplete="off"
                    />
                    <InputGroupAddon>
                      <UserIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            form="register-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
