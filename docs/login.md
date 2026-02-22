# Login Component

A flexible login form that supports email, username, phone, and password fields — with built-in show/hide password, loading state, and error/success feedback.

## Installation

```bash
npm i @camai/common
```

## Basic Usage

```tsx
import Login1 from "@camai/common/auth/Login1";

export default function LoginPage() {
  const handleLogin = async (values: Record<string, string>) => {
    const data = await login(values.email, values.password);
    localStorage.setItem("token", data.access_token);
  };

  return (
    <Login1
      fields={[{ name: "email" }, { name: "password" }]}
      onLogin={handleLogin}
    />
  );
}
```

## Field Combinations

The `fields` prop controls which inputs are shown, and in what order.

**Email + Password**
```tsx
fields={[{ name: "email" }, { name: "password" }]}
```

**Username only**
```tsx
fields={[{ name: "username" }]}
```

**Phone + Password**
```tsx
fields={[{ name: "phone" }, { name: "password" }]}
```

## With Loading & Error State

```tsx
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
    <Login1
      fields={[{ name: "email" }, { name: "password" }]}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
```

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

## Props

| Prop        | Type                                    | Required | Description                              |
|-------------|-----------------------------------------|----------|------------------------------------------|
| `fields`    | `Field[]`                               | Yes      | List of fields to render                 |
| `onLogin`   | `(values: Record<string, string>) => void` | No    | Called on form submit with field values  |
| `isLoading` | `boolean`                               | No       | Disables inputs and shows loading text   |
| `error`     | `string \| null`                        | No       | Shows a red error banner                 |
| `success`   | `string \| null`                        | No       | Shows a green success banner             |

### Field options

| Key           | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `name`        | `"email" \| "username" \| "phone" \| "password"` | Field identifier |
| `label`       | `string` | Override the default label text      |
| `placeholder` | `string` | Override the default placeholder     |
