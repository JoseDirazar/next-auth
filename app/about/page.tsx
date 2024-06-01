import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { currentUser } from "@/lib/auth";
import { ROLETYPE } from "@prisma/client";

export default async function AboutPage() {
  const user = await currentUser();
  return (
    <>
      <RoleGate allowedRole={ROLETYPE.ADMIN}>
        <FormSuccess message={`You are an truly admin ${user?.name}`} />
      </RoleGate>
    </>
  );
}
