import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "SK Finance HR Assistant",
  description: "Your personalised HR Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#f2f9f5] text-gray-900">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#f2f9f5]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
