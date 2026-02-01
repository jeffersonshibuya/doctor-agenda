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
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AddDoctorButton from "./_components/add-doctor-button";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/authentication");
  }

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
          <AddDoctorButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>Doctors</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
