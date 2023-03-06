import { Html, Head, Main, NextScript } from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

export default function Document() {
  // TOOD understand why this works SSR
  resetServerContext();

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
