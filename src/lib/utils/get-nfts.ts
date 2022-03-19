import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

export const getNFTCollections = async () => {
  var connection = new Connection("mainnet-beta");

  const OwnerPublickey = "HWJp4y3mvA8DE58LRAN4wNhf5U3RgcrSo7iYA66gqVqK";

  const nftsmetadata = await Metadata.findDataByOwner(
    connection,
    OwnerPublickey
  );

  console.log(nftsmetadata);
};
