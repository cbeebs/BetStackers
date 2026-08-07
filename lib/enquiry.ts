import { z } from "zod";

export const FORM_SOURCES = {
  partnerships: "Partnerships",
  traffic: "Traffic",
  general: "General",
} as const;

export type FormType = keyof typeof FORM_SOURCES;

export const enquirySchema = z.object({
  formType: z.enum(["partnerships", "traffic", "general"]),
  name: z
    .string()
    .trim()
    .min(1, "Enter your full name so we know who to reply to."),
  company: z
    .string()
    .trim()
    .min(1, "Enter your company or brand."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address (for example you@company.com)."),
  subject: z
    .string()
    .trim()
    .min(1, "Add a subject so we know what this is about."),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us a bit more in the message field."),
  website_url: z.string().optional(),
  formStartedAt: z.number().optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;
