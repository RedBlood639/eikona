/*eslint-disable  react-hooks/exhaustive-deps */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Container from "components/Container";
import useWalletNFTs from "hooks/useWalletNFTs";
import { getNFTCollections } from "lib/utils/get-nfts";
import { useEffect, useState } from "react";

import style from "./wallet.module.scss";
declare global {
  interface Window {
    solana: any;
  }
}

const PhantomWallet = ({ setNFTs, setWalletId }: any) => {
  const [address, setAddress] = useState<string>("");
  const { NFTs }: any = useWalletNFTs();
  const wallet = useWallet();

  useEffect(() => {
    console.log(getNFTCollections());

    if (NFTs && wallet?.publicKey?.toString()) {
      setWalletId(wallet?.publicKey?.toString());
      setNFTs([...NFTs]);
    }
  }, [NFTs, setNFTs]);

  useEffect(() => {
    console.log(address);
  }, [address]);

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
            <p>Please input your wallet address.</p>
          )}
          <div style={{ textAlign: "center" }}>
            <WalletMultiButton className={style.walletconnect} />

            <input
              type="text"
              className={style.addressinput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PhantomWallet;
