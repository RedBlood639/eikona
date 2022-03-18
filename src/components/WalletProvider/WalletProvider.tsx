/*eslint-disable  react-hooks/exhaustive-deps */
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import logo from "assets/walletModalLogo.png";

/**
 * Component that contains the whole minting process
 * It is necessary to be separate, since it depends on the global window variable
 * Then the rest of the page can be rendered on server
//  */
const WalletProviderSection = ({ children }: any) => {
  const network = process.env
    .REACT_APP_CONNECTION_NETWORK as WalletAdapterNetwork;

  const endpoint: any =
    process.env.REACT_APP_CONNECTION_NETWORK === "devnet"
      ? process.env.REACT_APP_SOLANA_RPC_HOST_DEVNET
      : process.env.REACT_APP_SOLANA_RPC_HOST_MAINNET_BETA;

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [getPhantomWallet()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider
          className="walletModal"
          container="#root"
          logo={logo}
        >
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProviderSection;
