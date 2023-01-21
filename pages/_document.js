// import React from "react";
// import Document, { Main, Head, NextScript, Html } from "next/document";
// import Helmet from "react-helmet";

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps, helmet: Helmet.renderStatic() };
//   }
//   render() {
//     const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
//     const htmlAttrs = htmlAttributes.toComponent();
//     const bodyAttrs = bodyAttributes.toComponent();
//     return (
//       <Html {...htmlAttrs}>
//         <Head>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
//             rel="stylesheet"
//           />
//           {Object.values(helmet).map((el) => el.toComponent())}
//         </Head>
//         <body {...bodyAttrs}>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@200;300;400;500&display=swap" rel="stylesheet"/>
          <Script
            id="googlemaps"
            type="text/javascript"
            strategy="beforeInteractive"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiPePDIL-iGCiqkEol1mkYlBTWwxwzitk&libraries=places"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
