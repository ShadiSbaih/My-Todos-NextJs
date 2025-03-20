'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
          <div className="max-w-md space-y-6 text-center">
            <h1 className="text-3xl font-bold text-destructive">Something went very wrong!</h1>
            <p className="text-lg text-muted-foreground">
              {error.message || 'The application encountered a critical error.'}
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => reset()}
                size="lg"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 