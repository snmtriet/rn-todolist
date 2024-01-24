const avatars: string[] = [
  'https://i.seadn.io/gcs/files/d827d01ba0effe87104b89bb91327400.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/56a246608cf95d63b8e8fddaec3c6fef.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/3d603e4d27042279375089ff9eb585e8.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/1fce75f0c8b2ac2f54bafab20dca4412.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/49f72ddc6fa5010702a3491a81e21e13.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/ff4485d29fce7b1edc12724ca0354668.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/6f1455e58cd9664e9999023f7ef6b644.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/8a10ee2677d84cdfed516406a1541cb3.png?auto=format&dpr=1&w=512',
  'https://i.seadn.io/gcs/files/8a10ee2677d84cdfed516406a1541cb3.png?auto=format&dpr=1&w=512',
];

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}

export default getRandomImage;
