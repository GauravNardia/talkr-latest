import { ReactNode } from "react";
import Image from "next/image";
// import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
//   const session = await auth();

//   if (session) redirect("/");

  return (
    <main className="w-full min-h-screen bg-neutral-950">
     <div className="w-full h-screen flex flex-col justify-center items-center">
       {children}
     </div>
    </main>
  );
};

