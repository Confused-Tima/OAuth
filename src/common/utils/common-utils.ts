/**
 * Checks if an object has any valid (non-null, non-undefined) members
 * @param obj - The object to validate
 * @returns boolean indicating if the object has any valid members
 */
export function isValidObject(obj: any): boolean {
  return (
    !!obj &&
    Object.values(obj).some((value) => value !== null && value !== undefined)
  );
}
