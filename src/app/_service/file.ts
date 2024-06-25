import { storage } from '@/lib/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const getImagePath = (url: string) => {
  const regex = /(?<=.com\/o\/)(.*)(?=\?alt=)/g;
  const path = String(url.match(regex)).replace('%2F', '/');
  return path;
};

const saveImage = async ({ image, userId }: { image: { file: File; name: string }; userId: string }) => {
  const imageRef = ref(storage, `${userId}/${image.name}`);
  const response = await uploadBytes(imageRef, image.file);
  const url = await getDownloadURL(response.ref);
  return url;
};

const deleteImage = async ({ path, userId }: { path: string; userId: string }) => {
  const imagePath = path.split('/');
  if (imagePath[0] !== userId) return;
  try {
    const imgRef = ref(storage, path);
    await deleteObject(imgRef);
  } catch (e) {
    console.log(e);
  }
};

export { saveImage, deleteImage, getImagePath };
