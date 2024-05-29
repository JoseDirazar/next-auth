import { auth } from "@/auth";
import { LogoutButton } from "@/components/buttons/sign-out";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <h1>Hello {session?.user?.name}!</h1>
      ) : (
        <h1>Hello!. Please sign in</h1>
      )}

      <div className="contain-content flex items-center jusrify-center p-5 gap-5">
        {session?.user ? (
          <LogoutButton>Log out</LogoutButton>
        ) : (
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="sign-up">Sign Up</Link>
          </>
        )}
      </div>
      <Link href="/about">About</Link>
    </main>
  );
}
