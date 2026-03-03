import type {Metadata} from 'next';
import './globals.css';
import FirebaseInit from '../components/FirebaseInit';

export const metadata: Metadata = {
  title: 'IdeaForge Blueprint',
  description: 'Simple startup plans for first-time founders',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseInit />
        {children}
      </body>
    </html>
  );
}
