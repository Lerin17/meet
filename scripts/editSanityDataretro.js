const { createClient } = require('@sanity/client');
const { imageSize } = require('image-size');
const pLimit = require('p-limit');

const client = createClient({
  projectId: '1vdilawh',
  dataset: 'production',
  apiVersion: '2025-12-28',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // REQUIRED for write
});

const limit = pLimit(3); // 🔑 prevents timeout

const getThumbnailUrl = (url) => {
  if (url.includes("drive.google.com")) {
    const fileId = url.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }
  return null;
};

async function processAsset(asset, houseId) {
  try {
    const url = asset.url;
    const thumb = getThumbnailUrl(url);

    if (!thumb) return asset;

    console.log("Fetching:", thumb);

    const res = await fetch(thumb);
    const buffer = Buffer.from(await res.arrayBuffer());

    const { width, height } = imageSize(buffer);

    console.log(`✓ ${width}x${height}`);

    return {
      ...asset,
      width,
      height,
    };

  } catch (err) {
    console.log("✗ Failed:", asset.url);
    return asset; // don't break whole script
  }
}

async function main() {
  const houses = await client.fetch('*[_type == "house"]');

  for (const house of houses) {
    console.log(`\nProcessing house: ${house._id}`);

    const assets = house.assets || [];

    // 🔑 limit concurrency here
    const updatedAssets = await Promise.all(
      assets.map(asset =>
        limit(() => processAsset(asset, house._id))
      )
    );

    console.log(updatedAssets, 'wexexxex')

    // 🔑 patch sanity
    await client
      .patch(house._id)
      .set({ assets: updatedAssets })
      .commit();

    console.log(`✔ Updated ${house._id}`);
  }

  console.log("\nDONE");
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});