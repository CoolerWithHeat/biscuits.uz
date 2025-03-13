import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>NextJS Version</title>
            <link rel="icon" type="image/jpeg" href="https://s3.amazonaws.com/cmscritic.mediasite.org/assets/products/nextjs/logo-291886093470.jpeg?v=1684765419030" />
        </head>
        <body>
          <main>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Oswald:wght@500;600;700&family=Pacifico&display=swap" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" />
            {children}
          </main>
        </body> 
      </html>
    </StoreProvider>
  );
};