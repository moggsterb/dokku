import RootLayout from '@/components/Layout/RootLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
