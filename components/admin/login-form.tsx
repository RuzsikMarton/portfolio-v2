'use client';

import { login, LoginState } from '@/app/admin/login/actions';
import { useActionState, useState } from 'react';
import { IconEye, IconEyeOff, IconLoader2 } from '@tabler/icons-react';

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);
  // controlled so value persists after failed login
  const [username, setUsername] = useState('');

  return (
    <form action={action} className="space-y-5" noValidate>
      <div>
        <label htmlFor="username" className="field-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          className="field-input"
        />
      </div>
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="field-input pr-14"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 grid w-14 place-items-center text-ink-2 hover:text-ink"
          >
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        </div>
      </div>

      <p role="alert" aria-live="polite" className="min-h-6 text-base font-medium text-danger">
        {state.error}
      </p>

      <button type="submit" disabled={pending} className="primary-button w-full">
        {pending ? <IconLoader2 className="animate-spin" /> : 'Log In'}
      </button>
    </form>
  );
}
