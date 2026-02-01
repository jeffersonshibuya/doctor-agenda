export enum MedicalSpecialty {
  CARDIOLOGY = "Cardiology",
  DERMATOLOGY = "Dermatology",
  NEUROLOGY = "Neurology",
  PEDIATRICS = "Pediatrics",
  RADIOLOGY = "Radiology",
  ONCOLOGY = "Oncology",
  ORTHOPEDICS = "Orthopedics",
  GYNECOLOGY = "Gynecology",
  PSYCHIATRY = "Psychiatry",
  UROLOGY = "Urology",
}

export const medicalSpecialtyOptions = Object.entries(MedicalSpecialty).map(
  ([key, value]) => ({
    label: key,
    value: value,
  }),
);
