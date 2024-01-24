export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex justify-center px-4 items-center min-h-screen pb-[150px]">{children}</main>;
}
