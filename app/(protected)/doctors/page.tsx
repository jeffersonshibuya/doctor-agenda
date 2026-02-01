import { auth } from "@/app/lib/auth";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/authentication");
  }
  console.log("SESSION", session.user.clinic);
  if (!session.user.clinic.id) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Doctors</PageTitle>
          <PageDescription>Manage clinic doctors</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <Plus />
            Add Doctor
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>Doctors</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
