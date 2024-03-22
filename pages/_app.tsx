import { ApiProvider } from "@/Contextstore/context"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {store} from '@/redux_toolkit/store/store'
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
<Provider store={store}>
<ApiProvider>

  <Component {...pageProps} />;
</ApiProvider>
</Provider>



  </>)
}
