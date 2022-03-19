import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";

export const getNFTCollections = async (OwnerPublickey: string) => {
  const connection = new Connection("mainnet-beta");
  let data = [];

  try {
    const nftsmetadata = await Metadata.findDataByOwner(
      connection,
      OwnerPublickey
    );
    for (let i = 0; i < nftsmetadata.length; i++) {
      const offchain = await axios.get(nftsmetadata[i].data.uri);
      data.push(offchain.data);
    }
    return data;
  } catch (e) {
    return data;
  }
};
