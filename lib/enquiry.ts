import { z } from "zod";

export const FORM_SOURCES = {
  partnerships: "Partnerships",
  traffic: "Traffic Enquiry",
} as const;

export type FormType = keyof typeof FORM_SOURCES;

export const enquirySchema = z
  .object({
    formType: z.enum(["partnerships", "traffic"]),
    name: z
      .string()
      .trim()
      .min(1, "Enter your full name so we know who to reply to."),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address (for example you@company.com)."),
    message: z
      .string()
      .trim()
      .min(1, "Please tell us a bit more in the message field."),
    company: z.string().trim().optional(),
    website: z.string().trim().optional(),
    website_url: z.string().optional(),
    formStartedAt: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.formType === "partnerships" && !data.company?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["company"],
        message: "Enter your company name.",
      });
    }
    if (data.formType === "traffic" && !data.website?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["website"],
        message: "Enter your website or traffic source.",
      });
    }
  });

export type EnquiryPayload = z.infer<typeof enquirySchema>;
