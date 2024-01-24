export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex justify-center items-center min-h-screen pb-[180px]">{children}</main>;
}
