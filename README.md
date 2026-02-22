# @camai/common

Shared UI components for the Camai platform.

## Installation

```bash
npm i @camai/common
```

## Components

### Login

A ready-to-use login form component with support for email, username, phone, and password fields.

```tsx
import Login1 from "@camai/common/auth/Login1";

<Login1
  fields={[{ name: "email" }, { name: "password" }]}
  onLogin={(values) => console.log(values)}
/>
```

→ [Full login documentation](docs/login.md)
