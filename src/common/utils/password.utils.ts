import { InternalServerErrorException } from '@nestjs/common';
import * as argon from 'argon2';

/**
 * Hash the given string
 * @param password Password to be hashed
 * @returns Promise resolving to a hashed password string
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPass = await argon.hash(password);
    return hashedPass;
  } catch (error) {
    throw new InternalServerErrorException(
      `Error during password hashing ${error}`,
    );
  }
}
