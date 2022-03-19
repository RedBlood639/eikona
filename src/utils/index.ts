import { Connection } from "@metaplex/js";
import {
  Metadata,
  MetadataData,
} from "@metaplex-foundation/mpl-token-metadata";

const SOLSNATCHERS_CANDY_MACHINES = [
  "7jdtxdmiQTrAeCqQkuvtJiiZ7Pe7SHkQucEeLPJKHX3q",
  "85Sfoc13utW3rwMPJTQKd5rqPym9rVq4Roh4zKKcgsK6",
  "EeoKFLM9Cc1QAbdR3RFWcbZ9bP8CjQ2nWoNH8cJNeKq2",
  "BHZXW8W7w84kQRRi3W7hyYjinFuGT9LPYL88bM398vEs",
  "6fW2M3dJfUbLL25V74x5XYdQNajjdo56uKosLUTMcsLi",
];

export const fetchNFTs = (nftsmetadata: MetadataData[]) => {
  const filteredMetadataAccounts = nftsmetadata?.filter((metadataAccount) => {
    const { data } = metadataAccount;

    const creator = data?.creators?.find(
      (creator) => SOLSNATCHERS_CANDY_MACHINES.indexOf(creator.address) !== -1
    );

    /** Make sure it's verified to prevent exploiters */
    if (creator && creator.verified) {
      return metadataAccount;
    }
    return false;
  });

  return filteredMetadataAccounts;
};
export const getNFTCollections = async (OwnerPublickey: string) => {
  const connection = new Connection("mainnet-beta");
  let data: any = [];

  try {
    const nftsmetadata: MetadataData[] = await Metadata.findDataByOwner(
      connection,
      OwnerPublickey
    );

    const filteredMetadataAccounts = fetchNFTs(nftsmetadata);
    if (!filteredMetadataAccounts || !filteredMetadataAccounts.length)
      return [];

    const metadataPromises = filteredMetadataAccounts.map(async (metadata) => {
      const {
        data: { uri },
      } = metadata;
      const content = await (await fetch(uri)).json();

      return {
        onChain: metadata,
        offChain: content,
      };
    });

    data = await Promise.all(metadataPromises);

    return data;
  } catch (e) {
    return data;
  }
};
