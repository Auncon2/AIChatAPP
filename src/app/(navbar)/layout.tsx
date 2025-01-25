import Footer from "@/modules/HomePage/Footer";
import NavbarV2 from "@/modules/Nav/NavbarV2";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarV2 />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
