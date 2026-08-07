export type EnquirySource =
  | "General Contact"
  | "Partner Enquiries"
  | "Traffic Enquiries";

export const ENQUIRY_SOURCES = [
  "General Contact",
  "Partner Enquiries",
  "Traffic Enquiries",
] as const satisfies readonly EnquirySource[];
