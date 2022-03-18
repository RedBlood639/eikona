/*eslint-disable  @typescript-eslint/no-unused-vars */
import { useState } from "react";
import PhantomWallet from "./phantom-wallet";
import SelectGeoFigs from "./select-geofig";

const ConnectWallet = () => {
  const [walletId, setWalletId] = useState("");
  const [NFTs, setNFTs] = useState([]);

  return (
    <>
      {NFTs.length === 0 ? (
        <PhantomWallet setNFTs={setNFTs} setWalletId={setWalletId} />
      ) : (
        <SelectGeoFigs walletId={walletId} NFTs={NFTs} />
      )}
    </>
  );
};

export default ConnectWallet;
