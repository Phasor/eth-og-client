// import { NFTStorage, File } from 'nft.storage'

// const useUploader = () => {
//     const endpoint = 'https://api.nft.storage';
//     const token = process.env.REACT_APP_NFT_STORAGE_KEY;
//     var metadataURL = "";
//     const EXTERNAL_URL = "https://www.mywebsite.com";

//     async function uploadMetaData(_name, _description, _image, _atributes) {
//         try {
//             const storage = new NFTStorage({ endpoint, token });

//             const metadata = await storage.store({
//                 name: _name,
//                 description: _description,
//                 image: new File([_image], `${_name.substring(1)}.jpg`, { type: 'image/jpg' }),
//                 external_url: EXTERNAL_URL,
//                 attributes: _atributes,
//             })

//             console.log('IPFS URL for the metadata:', metadata.url);
//             metadataURL = metadata.url;
//             return metadata.url;
//         }
//         catch (err) {
//             console.log(err)
//         };
//     }
//     return { uploadMetaData, metadataURL };
// };

// export default useUploader;
