import { z } from "zod";
import { Control, FieldErrors, UseFormSetValue, UseFormWatch, UseFormTrigger } from "react-hook-form";

// Phone configuration by country
export const PHONE_CONFIG = {
  US: { code: "+1", maxDigits: 10, mask: "(###) ###-####", placeholder: "(555) 123-4567" },
  BR: { code: "+55", maxDigits: 11, mask: "(##) #####-####", placeholder: "(11) 99999-9999" },
  PT: { code: "+351", maxDigits: 9, mask: "### ### ###", placeholder: "912 345 678" },
  GB: { code: "+44", maxDigits: 10, mask: "#### ### ###", placeholder: "7911 123 456" },
  CA: { code: "+1", maxDigits: 10, mask: "(###) ###-####", placeholder: "(416) 555-1234" },
} as const;

export type CountryCode = keyof typeof PHONE_CONFIG;

// Form variant based on locale
export type FormVariant = "us" | "br";

// Available time slots (9am-5pm)
export const TIME_SLOTS = [
  { value: "09:00", label: "9 AM", period: "morning" },
  { value: "10:00", label: "10 AM", period: "morning" },
  { value: "11:00", label: "11 AM", period: "morning" },
  { value: "12:00", label: "12 PM", period: "afternoon" },
  { value: "13:00", label: "1 PM", period: "afternoon" },
  { value: "14:00", label: "2 PM", period: "afternoon" },
  { value: "15:00", label: "3 PM", period: "afternoon" },
  { value: "16:00", label: "4 PM", period: "afternoon" },
  { value: "17:00", label: "5 PM", period: "afternoon" },
] as const;

// Days of week (Mon-Sat)
export const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

// Form schema creator
export const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t("errors.nameRequired") }),
  email: z.string().email({ message: t("errors.invalidEmail") }),
  phone: z.string().min(1, { message: t("errors.invalidPhone") }),
  phoneCountry: z.enum(["US", "BR", "PT", "GB", "CA"]).default("US"),
  company: z.string().optional(),
  selectedDay: z.string().min(1, { message: "Please select a day" }),
  selectedTime: z.string().min(1, { message: "Please select a time" }),
  message: z.string().optional(),
});

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

// Shared props for step components
export interface StepProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  trigger: UseFormTrigger<FormValues>;
  t: (key: string) => string;
  variant: FormVariant;
}

// Phone input props
export interface PhoneInputProps extends StepProps {
  phoneCountry: CountryCode;
  phone: string;
  onCountryChange: (country: CountryCode) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => void;
}
