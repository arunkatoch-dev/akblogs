import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import App from "@/components/App";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <App>{children}</App>
        </body>
      </html>
    </ClerkProvider>
  );
}
