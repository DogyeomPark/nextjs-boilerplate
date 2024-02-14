import { auth } from '@/auth';

export default async function getCurrentUser() {
  try {
    const session = await auth();
    return session?.user ?? null;
  } catch (error: any) {
    return null;
  }
}
