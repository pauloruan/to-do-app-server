import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
