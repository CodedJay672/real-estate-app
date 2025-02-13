import { auth } from "@/auth";
import Header from "./Header";

const Topbar = async () => {
  const session = await auth();
  return <Header session={session} />;
};

export default Topbar;
