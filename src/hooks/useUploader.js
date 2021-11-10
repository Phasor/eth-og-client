import { NFTStorage, File } from 'nft.storage'

const useUploader = () => {
    const endpoint = 'https://api.nft.storage';
    const token = process.env.REACT_APP_NFT_STORAGE_KEY;

    async function uploadMetaData(_name, _description, _image) {
        try {
            const storage = new NFTStorage({ endpoint, token });

            const metadata = await storage.store({
                name: _name,
                description: _description,
                image: new File([_image], `${_name}.jpg`, { type: 'image/jpg' }),
            })

            console.log('IPFS URL for the metadata:', metadata.url);
        }
        catch (err) {
            console.log(err)
        };
    }
    return { uploadMetaData };
};

export default useUploader;
