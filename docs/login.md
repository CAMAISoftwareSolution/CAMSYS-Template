# Login

Two ready-to-use login components with flexible fields, show/hide password, loading state, and error/success feedback.

| Component | Description |
|---|---|
| `Login` | Compact centered card — good for standalone login pages |
| `FullScreenLogin` | Split-screen layout with company branding and dark mode toggle |

---

## Installation

```bash
npm i @camai/common
```

---

## Login

A minimal centered card form.

```tsx
import Login from "@camai/common/auth/Login";

<Login
  fields={[{ name: "email" }, { name: "password" }]}
  onLogin={(values) => console.log(values.email, values.password)}
/>
```

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `fields` | `Field[]` | Yes | Fields to render, in order |
| `onLogin` | `(values: Record<string, string>) => void` | No | Called on submit |
| `isLoading` | `boolean` | No | Disables inputs and shows loading text |
| `error` | `string \| null` | No | Shows a red error banner |
| `success` | `string \| null` | No | Shows a green success banner |
| `theme` | `"light" \| "dark" \| "auto"` | No | Force a color theme. Defaults to `"auto"` (follows OS / localStorage) |
| `title` | `string` | No | Heading text. Defaults to `"Welcome back"` |
| `subtitle` | `string` | No | Subheading text. Defaults to `"Sign in to your account to continue"` |
| `submitLabel` | `string` | No | Submit button label. Defaults to `"Sign in"` |
| `footer` | `ReactNode` | No | Content rendered below the form inside the card (e.g. forgot password link) |

---

## FullScreenLogin

A full-screen split layout — decorative left panel with company branding, form on the right, built-in dark mode toggle.

```tsx
import FullScreenLogin from "@camai/common/auth/FullScreenLogin";

<FullScreenLogin
  fields={[{ name: "username" }, { name: "password" }]}
  onLogin={(values) => console.log(values)}
  companyName="Acme"
  companyLogo="https://example.com/logo.svg"
/>
```

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `fields` | `Field[]` | Yes | Fields to render, in order |
| `onLogin` | `(values: Record<string, string>) => void` | No | Called on submit |
| `isLoading` | `boolean` | No | Disables inputs and shows spinner |
| `error` | `string \| null` | No | Shows a red error banner |
| `success` | `string \| null` | No | Shows a green success banner |
| `companyName` | `string` | No | Shown in the top bar and left panel footer. Defaults to `"Your Company"` |
| `companyLogo` | `string` | No | URL of logo image shown in the top bar and left panel |
| `theme` | `"light" \| "dark" \| "auto"` | No | Force a color theme. Defaults to `"auto"` (follows OS / localStorage) |
| `title` | `string` | No | Heading text on the form side. Defaults to `"Welcome back."` |
| `subtitle` | `string` | No | Subheading text on the form side. Defaults to `"Sign in to continue where you left off."` |
| `submitLabel` | `string` | No | Submit button label. Defaults to `"Sign in"` |
| `footer` | `ReactNode` | No | Content rendered below the form (e.g. forgot password link) |
| `tagline` | `ReactNode` | No | Custom content for the left decorative panel. Replaces the default italic tagline |

---

## Fields

Both components share the same `Field` type. The `fields` array controls which inputs appear and in what order.

```ts
type Field =
  | { name: "email";    label?: string; placeholder?: string }
  | { name: "username"; label?: string; placeholder?: string }
  | { name: "phone";    label?: string; placeholder?: string }
  | { name: "password"; label?: string; placeholder?: string }
```

### Field options

| Key | Type | Description |
|---|---|---|
| `name` | `"email" \| "username" \| "phone" \| "password"` | Identifies the field. Used as the key in the `values` object passed to `onLogin` |
| `label` | `string` | Override the default label text |
| `placeholder` | `string` | Override the default placeholder |

### Default labels & placeholders

| `name` | Default label | Default placeholder |
|---|---|---|
| `email` | Email address | you@example.com |
| `username` | Username | e.g. username |
| `phone` | Phone number | e.g. 012345678 |
| `password` | Password | •••••••• |

### Common combinations

```tsx
// Email + password
fields={[{ name: "email" }, { name: "password" }]}

// Username + password
fields={[{ name: "username" }, { name: "password" }]}

// Phone + password
fields={[{ name: "phone" }, { name: "password" }]}

// Username only (passwordless)
fields={[{ name: "username" }]}

// Custom labels
fields={[
  { name: "email", label: "Work email", placeholder: "you@company.com" },
  { name: "password" },
]}
```

---

## With Loading & Error State

```tsx
"use client";

import { useState } from "react";
import Login from "@camai/common/auth/Login";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (values: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await login(values.email, values.password);
      localStorage.setItem("token", data.access_token);
      setSuccess("Signed in successfully.");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      fields={[{ name: "email" }, { name: "password" }]}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
```

---

## Connecting to your API

Set your API base URL in `.env`:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

Then call your auth endpoint:

```ts
export async function login(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Login failed");

  return data as { access_token: string };
}
```
