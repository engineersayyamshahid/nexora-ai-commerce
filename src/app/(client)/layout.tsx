import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Venzaro online store",
    default: "Venzaro online store",
  },
  description:
    "Venzaro online store, your one-stop shop for all your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("font-sans", geist.variable)}
        suppressHydrationWarning
      >
        <body className="font-poppins antialiased">
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}



// import type { Metadata } from "next";
// import "../globals.css";
// import { Geist } from "next/font/google";
// import { cn } from "@/lib/utils";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Providers } from "@/components/Providers";

// const geist = Geist({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: {
//     template: "%s - Venzaro online store",
//     default: "Venzaro online store",
//   },
//   description:
//     "Venzaro online store, your one-stop shop for all your needs.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//  return (
//   <ClerkProvider>
//     <html
//       lang="en"
//       className={cn("font-sans", geist.variable)}
//       suppressHydrationWarning
//     >
//       <body className="font-poppins antialiased">
//         <div className="flex min-h-screen flex-col">
//           <Header />
//           <Providers>{children}</Providers>
//           {/* <main className="flex-1">{children}</main> */}
//           <Footer />
//         </div>
//       </body>
//     </html>
//   </ClerkProvider>
// );
// }

