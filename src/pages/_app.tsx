import { store } from "@/redux/store";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

{
  /*<Provider store={store}> */
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
