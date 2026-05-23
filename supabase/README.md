# Flux Supabase setup

## Fresh database

Run in order in **Supabase → SQL Editor**:

1. `migrations/20250101000000_initial_flux_schema.sql` — projects table, storage, RLS
2. `migrations/20260523000000_add_project_columns.sql` — only if upgrading an old DB
3. `migrations/20260523100000_cms_services_inquiries.sql` — services, site_content, inquiries

## Admin user

**Authentication → Users → Add user**  
Email: `fluxit.mk@gmail.com`

## First-time CMS setup

After migrations, in admin:

1. **Settings** → **Import default content** (writes homepage copy to `site_content`)
2. **Services** → **Import defaults** (seeds the 6 services)
3. **Projects** → add portfolio items

Until you import, the public site still shows built-in defaults from code.

## Tables

| Table | Purpose |
|-------|---------|
| `projects` | Portfolio / work |
| `services` | Homepage service cards + detail sections |
| `site_content` | Hero, about, process, contact, footer, settings (JSON per key) |
| `inquiries` | Contact form submissions |

## Contact form

Submissions POST to `/api/inquiries` and save to `inquiries`. View them under **Admin → Messages**.

### Email / webhook notifications

Copy `.env.example` to `.env.local` and configure **one** email method (or add a webhook):

| Method | Env vars | Notes |
|--------|----------|--------|
| **Resend** | `RESEND_API_KEY`, `EMAIL_FROM`, `NOTIFY_EMAIL` | Easiest; delivers to Gmail/any inbox. [resend.com](https://resend.com) |
| **SMTP** | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `NOTIFY_EMAIL` | Gmail, Outlook, Zoho, etc. Gmail needs an [App Password](https://support.google.com/accounts/answer/185833). |
| **Webhook** | `NOTIFY_WEBHOOK_URL` | Instant ping in Discord or Slack (auto-detected from URL). Optional alongside email. |

**Discord webhook:** channel → Integrations → Webhooks → New Webhook → copy URL into `NOTIFY_WEBHOOK_URL`.  
**Slack:** Incoming Webhooks app → copy `hooks.slack.com/...` URL.  
**Make / Zapier:** Custom webhook trigger — receives JSON with `name`, `email`, `message`, `admin_url`.  
Remove `NOTIFY_WEBHOOK_URL` from `.env.local` if you only want email (avoids errors when email isn’t set up yet).

`NOTIFY_EMAIL` can be omitted if **Settings → Contact email** is set in admin (same address is used).

Set `NEXT_PUBLIC_SITE_URL` so notification emails link to `/admin/messages`.
