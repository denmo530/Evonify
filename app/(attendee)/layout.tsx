import Footer from "@/app/(marketing)/_components/footer";
import { Header } from "./header";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
