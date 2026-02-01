"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import UpserDoctorForm from "./upsert-doctor-form";

const AddDoctorButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Doctor
        </Button>
      </DialogTrigger>
      <UpserDoctorForm />
    </Dialog>
  );
};

export default AddDoctorButton;
