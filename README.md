![sb-kit-banner](https://github.com/user-attachments/assets/319e0907-ceb8-4db2-9643-b86a43a48108)

# `sb-kit`

Drop-in authentication layer for Next.js and Supabase.

It’s built for speed. Perfect for MVPs and rapid prototyping. It handles the full auth flow, including UI, so you can focus on building your product without compromising security or flexibility.

## Getting started

You’ll find everything you need in the [👉sb-kit docs](https://sb-kit.hillche.com).

```sh
# npm
npm i @sb-kit/core @sb-kit/ui

# pnpm
pnpm add @sb-kit/core @sb-kit/ui

# yarn
yarn add @sb-kit/core @sb-kit/ui

# bun
bun add @sb-kit/core @sb-kit/ui
```

## Features

- Ready-to-use auth components.
- Works with your existing Supabase client.
- Easy and type-safe setup.
- Sync code with Supabase settings in a single file.
- Safe dynamic redirects to the original path after login.
- Server-side authentication by default.

## Core Concepts

- _Bring Your Own Client:_

  sb-kit doesn’t create its own Supabase client. Instead, it’s designed to work with the client instance provided by your application, giving you full control over how it’s configured.

  This means you can continue using all Supabase features through your client, in addition to what sb-kit provides.

- _Centralized Configuration:_

  Integrating Supabase Auth with Next.js usually means writing scattered setup code across multiple files. sb-kit centralizes everything into a single configuration file, making it easier to manage and update.

- _Ready to Use:_

  Supabase offers powerful customization options, but sometimes you just need auth that works out of the box. sb-kit provides common auth UI patterns and logic you can drop in and start using right away.

## Contributions

This project was originally built for personal use, and I've added documentation before sharing it. Since it hasn't received external feedback yet, I'd especially welcome any contributions! Whether you spot a bug, have an idea for a new feature, or want to improve the documentation, PRs and issues are always welcome.

## In closing

Last year, I needed to quickly jump into web frontend from scratch for a prototype build. Supabase monorepo was an excellent learning resource. Later, I built and sold a private service using Supabase, which is still running smoothly today.

sb-kit is how I give back to the ecosystem. I hope sb-kit can be helpful for you too!
