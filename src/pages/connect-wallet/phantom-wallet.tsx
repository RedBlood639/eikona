/*eslint-disable  react-hooks/exhaustive-deps */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Container from "components/Container";
import useWalletNFTs from "hooks/useWalletNFTs";
import { useEffect } from "react";

import style from "./wallet.module.scss";
declare global {
  interface Window {
    solana: any;
  }
}

const PhantomWallet = ({ setNFTs, setWalletId }: any) => {
  const { NFTs }: any = useWalletNFTs();
  const wallet = useWallet();

  useEffect(() => {
    if (NFTs && wallet?.publicKey?.toString()) {
      setWalletId(wallet?.publicKey?.toString());
      setNFTs([...NFTs]);
    }
  }, [NFTs, setNFTs]);

  return (
    <Container>
      <div className={style.main}>
        <div className={style.phantom}>
          {wallet.publicKey ? (
            <p>
              Please give us a moment while we identify any GeoFigs in your
              wallet
            </p>
          ) : (
            <p>Please connect your wallet to continue</p>
          )}
          <div style={{ textAlign: "center" }}>
            <WalletMultiButton className={style.walletconnect} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PhantomWallet;
