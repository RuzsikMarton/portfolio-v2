'use client';

/** Last resort when the root layout itself fails: plain, but never blank. */
export default function GlobalError() {
  return (
    <html lang="sk">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          background: '#1c1c21',
          color: '#e8ebed',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main style={{ padding: 24, maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>Error</h1>
          <p style={{ fontSize: 18, opacity: 0.75 }}>
            Unexpected error, something went wrong. Try again.
          </p>
          <button
            type="button"
            onClick={() => location.reload()}
            style={{
              marginTop: 16,
              minHeight: 40,
              padding: '0 28px',
              borderRadius: 999,
              border: 0,
              fontSize: 18,
              fontWeight: 600,
              background: '#e8ebed',
              color: '#1c1c21',
            }}
          >
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}
