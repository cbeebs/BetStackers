# BetStackers

Landing page for **BetStackers** — [betstackers.com](https://betstackers.com).

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind
- Resend (Vercel Marketplace) for contact form email
- GitHub → Vercel auto-deploy

## Contact forms

All three CTAs open the same modal and email `partners@betstackers.com` with a labelled subject:

| CTA | Subject label |
|-----|----------------|
| Contact (nav) | General Contact |
| Partner | Partner Enquiries |
| Traffic Enquiries | Traffic Enquiries |

## Env

Pulled from Vercel after Resend is installed:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (optional, defaults to partners@betstackers.com)
- `CONTACT_FROM_EMAIL` (optional; use a verified Resend domain sender)
