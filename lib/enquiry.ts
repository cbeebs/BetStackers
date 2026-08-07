import { z } from "zod";

export const FORM_SOURCES = {
  general: "General",
  partnerships: "Partnerships",
  traffic: "Traffic Enquiry",
} as const;

export type FormType = keyof typeof FORM_SOURCES;

export const enquirySchema = z.object({
  formType: z.enum(["general", "partnerships", "traffic"]),
  name: z
    .string()
    .trim()
    .min(1, "Enter your name so we know who to reply to."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address (for example you@company.com)."),
  subject: z
    .string()
    .trim()
    .min(1, "Enter a subject for your message."),
  message: z
    .string()
    .trim()
    .min(1, "Add a short message."),
  company: z.string().trim().optional(),
  // Anti-spam
  website_url: z.string().optional(),
  formStartedAt: z.number().optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;
