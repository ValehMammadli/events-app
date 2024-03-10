export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
<div className="flex items-center justify-center min-h-screen w-full bg-primary-50">
    {children}
</div>
    );
  }