import db from "@/lib/prismaDb";
import { verifyPassword } from "./password";
import { User } from "@prisma/client";

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (user && (await verifyPassword(password, user.password))) {
      // Exclude the password before returning the user object
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
