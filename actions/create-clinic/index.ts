"use server";

import { auth } from "@/app/lib/auth";
import { db } from "@/db/drizzle";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createClinic = async (name: string) => {
  // Check user logged in
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  redirect("/dashboard");
};
