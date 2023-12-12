import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StatusProvider } from "@/contexts/StatusContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StatusProvider>
      <Component {...pageProps} />
    </StatusProvider>
  );
}
