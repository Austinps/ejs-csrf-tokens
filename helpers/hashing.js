import { hash, compare } from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS || 12;
  return await hash(password, saltRounds);
};

export const comparePassword = async (clearTextPassword, hashedPassword) =>
  await compare(clearTextPassword, hashedPassword);
