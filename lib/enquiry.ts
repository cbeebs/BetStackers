import { z } from "zod";

export const affiliateEnquirySchema = z.object({
  formType: z.literal("affiliate"),
  name: z
    .string()
    .trim()
    .min(1, "Enter your name so we know who to reply to."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address (for example you@company.com)."),
  brand: z
    .string()
    .trim()
    .min(1, "Enter the brand or site name you want to partner on."),
  markets: z
    .string()
    .trim()
    .min(1, "Enter the markets you cover (for example UK, DE, CA)."),
  message: z
    .string()
    .trim()
    .min(1, "Add a short message describing the partnership."),
  website: z.string().trim().optional(),
  company: z.string().trim().optional(),
  // Anti-spam
  website_url: z.string().optional(), // honeypot
  formStartedAt: z.number().optional(),
});

export const mediaEnquirySchema = z.object({
  formType: z.literal("media"),
  name: z
    .string()
    .trim()
    .min(1, "Enter your name so we know who to reply to."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address (for example you@company.com)."),
  company: z
    .string()
    .trim()
    .min(1, "Enter your company or media buyer name."),
  enquiryType: z
    .string()
    .trim()
    .min(1, "Choose an enquiry type from the list."),
  message: z
    .string()
    .trim()
    .min(1, "Add a short message describing what you need."),
  // Anti-spam
  website_url: z.string().optional(),
  formStartedAt: z.number().optional(),
});

export const enquirySchema = z.discriminatedUnion("formType", [
  affiliateEnquirySchema,
  mediaEnquirySchema,
]);

export type AffiliateEnquiry = z.infer<typeof affiliateEnquirySchema>;
export type MediaEnquiry = z.infer<typeof mediaEnquirySchema>;
export type EnquiryPayload = z.infer<typeof enquirySchema>;
export type FormType = EnquiryPayload["formType"];
