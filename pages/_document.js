import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#ff5200" />
        <link rel="icon" href="/logo/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </Html>
  );
}
