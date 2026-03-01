import config from "@/lib/config";
import { type NextRequest } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { cookies } from "next/headers";

const {
  env: {
    imagekit: { publicKey, privateKey },
  },
} = config;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  // get user token and validate signed in user;
  const userToken = cookieStore.get("user-token");

  // get the upload params
  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
    expire: 30 * 60,
  });

  //return
  return Response.json({ token, expire, signature, publicKey });
}
