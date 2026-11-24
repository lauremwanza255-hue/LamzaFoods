-- Lamza Foods: inquiry storage for Supabase (PostgreSQL).
-- Run in the Supabase SQL editor. The website writes with the service-role key from
-- the server only; Row Level Security blocks all access with the public anon key.

create table if not exists public.inquiries (
  id                    bigint generated always as identity primary key,
  reference             text not null unique,
  inquiry_type          text not null check (inquiry_type in ('contact', 'product', 'partnership', 'wholesale', 'quote')),
  customer_name         text not null,
  company_name          text,
  email                 text not null,
  phone                 text,
  country               text,
  products_of_interest  text[],
  message               text,
  payload               jsonb not null,          -- full validated submission
  status                text not null default 'new' check (status in ('new', 'in_progress', 'replied', 'closed', 'spam')),
  consent_at            timestamptz not null,    -- privacy consent record
  submitted_at          timestamptz not null default now()
);

create index if not exists inquiries_submitted_at_idx on public.inquiries (submitted_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;
-- No policies are created on purpose: only the service role (server side) can read or write.
