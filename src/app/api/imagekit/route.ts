import config from "@/lib/config";
import { type NextRequest } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const {
  env: {
    imagekit: { publicKey, privateKey },
  },
} = config;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  // get user token and validate signed in user;
  const session = await auth();
  if (!session?.user || session?.user.role !== "admin")
    throw new Error(
      "unauthorized access. Please login as an admin to continue.",
    );

  // get the upload params
  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  });

  //return
  return Response.json({ token, expire, signature, publicKey });
}
