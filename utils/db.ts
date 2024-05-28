"use server";
import db from "@/lib/prismaDb";
import { verifyPassword } from "./password";
import { AuthError } from "next-auth";
import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { signIn, signOut } from "@/auth";

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    /*     console.log('register form data:: ',formData)
      const validatedFields = RegisterSchema.safeParse(formData);
      console.log('register validate fields::', validatedFields)
  
    if (!validatedFields.success) {
     throw new Error("Invalid fields!");
    }
   */
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !name || !password) throw new Error("Values missing");
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log("user created! ", user);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }

  /* const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    ); */
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut();
};
