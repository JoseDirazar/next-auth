import { auth } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { currentUser } from "@/lib/auth";

export default async function AboutPage() {
  const user = currentUser();
  return (
    <>
      <RoleGate allowedRole="ADMIN">
        <FormSuccess message="You are an truly admin" />
      </RoleGate>
    </>
  );
}
