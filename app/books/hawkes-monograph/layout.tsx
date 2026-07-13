export default function HawkesMonographLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-register="criticism" className="register-criticism">
      {children}
    </div>
  );
}
