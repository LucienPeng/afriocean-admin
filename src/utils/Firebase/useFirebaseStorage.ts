import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const useFirebaseStorage = () => {
  const storage = getStorage();

  const uploadImage = async (file: File | null, filePath: string | undefined) => {
    if (file && filePath) {
      const mountainImagesRef = ref(storage, `materialImage/${filePath}`);
      await uploadBytes(mountainImagesRef, file)
        .then((snapshot) => snapshot)
        .catch((err) => console.log(err));

      const imagePath = await getDownloadURL(mountainImagesRef).then((res) => res);
      return imagePath;
    } else {
      return '';
    }
  };

  return { uploadImage, getDownloadURL, ref, storage };
};
