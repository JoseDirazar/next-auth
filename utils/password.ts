import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
