export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}