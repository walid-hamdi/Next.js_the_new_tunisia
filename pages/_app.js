import { AuthUserProvider } from "../contexts/AuthUserContext";
import { init } from "../libs/sentry";
import "../global.css";

init();

export default function App({ Component, pageProps, err }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return (
    <AuthUserProvider>
      <Component {...pageProps} err={err} />
    </AuthUserProvider>
  );
}
