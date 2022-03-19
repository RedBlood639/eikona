/*eslint-disable  react-hooks/exhaustive-deps */

import { Metadata } from "../lib/metadata";
import { useEffect, useState } from "react";

import useMetadataAccounts from "./useMetadataAccounts";

const SOLSNATCHERS_CANDY_MACHINES = [
  "7jdtxdmiQTrAeCqQkuvtJiiZ7Pe7SHkQucEeLPJKHX3q",
  "85Sfoc13utW3rwMPJTQKd5rqPym9rVq4Roh4zKKcgsK6",
  "EeoKFLM9Cc1QAbdR3RFWcbZ9bP8CjQ2nWoNH8cJNeKq2",
  "BHZXW8W7w84kQRRi3W7hyYjinFuGT9LPYL88bM398vEs",
  "6fW2M3dJfUbLL25V74x5XYdQNajjdo56uKosLUTMcsLi",
];

export type NFT = {
  onChain: Metadata;
  offChain: {
    attributes: Array<any>;
    collection: any;
    description: string;
    edition: number;
    external_url: string;
    image: string;
    name: string;
    properties: {
      files: Array<string>;
      category: string;
      creators: Array<string>;
    };
    seller_fee_basis_points: number;
  };
};
/** Returns all NFTs a wallet is holding based on candy machine addresses */
const useWalletNFTs = (candyMachineAddresses = SOLSNATCHERS_CANDY_MACHINES) => {
  const { metadataAccounts } = useMetadataAccounts();

  const [NFTs, setNFTs] = useState<NFT[]>();

  useEffect(() => {
    const fetchNFTs = async () => {
      /**
       * Filter accounts which one of the creators is a candy machine address
       * Otherwise, the NFT doesn't belong to the desired collection
       */
      const filteredMetadataAccounts = metadataAccounts?.filter(
        (metadataAccount) => {
          const { data } = metadataAccount;

          const creator = data?.creators?.find(
            (creator) => candyMachineAddresses.indexOf(creator.address) !== -1
          );

          /** Make sure it's verified to prevent exploiters */
          if (creator && creator.verified) {
            return metadataAccount;
          }

          return false;
        }
      );

      if (!filteredMetadataAccounts || !filteredMetadataAccounts.length)
        return [];

      /**
       * Fetch JSON file for each metadata:
       *
       *
       * At this point, we have the token info and metadata from on-chain request.
       * But we also want to fetch external JSON metadata from the uri.
       */
      const metadataPromises = filteredMetadataAccounts.map(
        async (metadata) => {
          const {
            data: { uri },
          } = metadata;
          const content = await (await fetch(uri)).json();

          return {
            onChain: metadata,
            offChain: content,
          };
        }
      );

      const metadatas = await Promise.all(metadataPromises);

      return metadatas;
    };

    if (metadataAccounts && metadataAccounts.length) {
      (async () => {
        const fetched: any = await fetchNFTs();

        setNFTs(fetched);
      })();
    }
  }, [metadataAccounts]);

  return { NFTs };
};

export default useWalletNFTs;
