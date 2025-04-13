import "../globals.css";
// import Navbar from "@/components/shared/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      <div className="antialiased w-full bg-neutral-950">
        <div className="w-full flex flex-col min-h-screen">
           {/* <Navbar/> */}
          <main className="flex-1 text-white">{children}</main> 
        </div>
      </div>
    </section>
  );
}
