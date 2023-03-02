import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";
import { sampleAuthenticatedDomains } from "../config";
import "../public/assets/sass/theme.scss";
import "../styles/globals.css";

const SignTransactionsModals = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/SignTransactionsModals"))
      .SignTransactionsModals;
  },
  { ssr: false }
);
const NotificationModal = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/NotificationModal"))
      .NotificationModal;
  },
  { ssr: false }
);
const TransactionsToastList = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsToastList"))
      .TransactionsToastList;
  },
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={EnvironmentsEnum.mainnet}
          customNetworkConfig={{
            name: "quantumxConfig",
            walletConnectV2ProjectId: "cf388e978587b4cba673b4080fb9d89b",
          }}
        >
          <Layout>
            <AxiosInterceptorContext.Listener />
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals className="custom-class-for-modals" />
            <Component {...pageProps} />
          </Layout>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
