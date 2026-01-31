import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockIcon, UserPlusIcon } from "lucide-react";
import SignUp from "./components/sign-up-form";
import SignIn from "./components/login-form";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-lg">
        <TabsList>
          <TabsTrigger value="login">
            <LockIcon />
            Login
          </TabsTrigger>
          <TabsTrigger value="register">
            <UserPlusIcon />
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SignIn />
        </TabsContent>
        <TabsContent value="register">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
