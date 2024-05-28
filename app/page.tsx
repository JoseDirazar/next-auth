import { auth } from "@/auth";
import { LogoutButton } from "@/components/buttons/sign-out";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{session && session?.user?.name}</h1>
      <Link href="/sign-in">Sign In</Link>
      <Link href="sign-up">Sign Up</Link>
      <Link href="/about">About</Link>
      <LogoutButton>Log out</LogoutButton>
    </main>
  );
}
