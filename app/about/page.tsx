import { auth } from "@/auth";

export default async function AboutPage() {
  const session = await auth();

  return <>{session && JSON.stringify(session)}</>;
}
