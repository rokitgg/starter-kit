import { auth } from "@acme/auth/server";
import { Button } from "@acme/ui/button";
import { headers } from "next/headers";

export async function AuthShowcase() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signInSocial({
              body: {
                provider: "github",
              },
            });
          }}
        >
          Sign in with Github
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: await headers(),
            });
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
