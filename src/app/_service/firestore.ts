import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { Likes, Searching } from '../type';
import { db } from '@/lib/firebase';

const getLike = async (recipeId: string) => {
  const likeRef = doc(db, 'like', recipeId);
  const docSnapshot = await getDoc(likeRef);
  if (docSnapshot.exists()) return docSnapshot.data();
  return null;
};

const like = async ({
  recipe,
  userId,
}: {
  recipe: { id: string; name: string; category: string; thumbnailUrl: string };
  userId: string;
}) => {
  try {
    const likeRef = doc(db, 'like', recipe.id);
    const docSnapshot = await getDoc(likeRef);
    if (docSnapshot.exists()) {
      const prev = { ...docSnapshot.data() } as Likes;
      if (prev.like.userId.includes(userId)) return;
      await updateDoc(likeRef, {
        ...prev,
        like: {
          userId: [...prev.like.userId, userId],
          count: prev.like.count + 1,
        },
      });
    } else {
      await setDoc(doc(db, 'like', recipe.id), {
        recipe,
        like: {
          userId: [userId],
          count: 1,
        },
      });
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const dislike = async ({ recipeId, userId }: { recipeId: string; userId: string }) => {
  try {
    const likeRef = doc(db, 'like', recipeId);
    const docSnapshot = await getDoc(likeRef);
    if (docSnapshot.exists()) {
      const prev = { ...docSnapshot.data() } as Likes;
      if (!prev.like.userId.includes(userId)) return;
      await updateDoc(likeRef, {
        ...prev,
        like: {
          userId: [...prev.like.userId.filter((item) => item !== userId)],
          count: prev.like.count > 0 ? prev.like.count - 1 : 0,
        },
      });
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getTopRatedLike = async () => {
  let list: Likes[] = [];
  const likeRef = collection(db, 'like');
  const docSnapshot = await getDocs(likeRef);
  docSnapshot.forEach((doc) => {
    doc.data().like.count > 0 && list.push({ ...doc.data() } as Likes);
  });
  list.sort((a, b) => {
    return b.like.count - a.like.count;
  });
  return list.slice(0, 5);
};

const getLikeByUserId = async ({ userId, page }: { userId: string; page: number }) => {
  const perPage = 10;
  let list: Likes[] = [];
  const likeRef = collection(db, 'like');
  const docSnapshot = await getDocs(likeRef);
  docSnapshot.forEach((doc) => {
    doc.data().like.userId.includes(userId) && list.push({ ...doc.data() } as Likes);
  });
  const totalElements = list.length;
  const totalPages = Math.ceil(totalElements / perPage);
  if (page <= 1) {
    list = list.slice(0, page * perPage);
  } else {
    list = list.slice((page - 1) * perPage, page * perPage);
  }
  return { likes: list, totalElements, totalPages };
};

const getSearchString = async () => {
  let list: Searching[] = [];
  const searchRef = collection(db, 'search');
  const docSnapshot = await getDocs(searchRef);
  docSnapshot.forEach((doc) => list.push({ ...(doc.data() as Searching), id: doc.id }));
  return list;
};

const updateSearchString = async (id: string) => {
  const searchRef = doc(db, 'search', id);
  const docSnapshot = await getDoc(searchRef);
  if (docSnapshot.exists()) {
    const prev = { ...docSnapshot.data() } as Searching;
    await updateDoc(searchRef, {
      ...prev,
      count: prev.count + 1,
    });
  }
};

const addSearchString = async (text: string) => {
  const textList = await getSearchString();
  const prev = textList.find((item) => item.text === text);
  if (!prev) {
    const docRef = await addDoc(collection(db, 'search'), {
      text,
      count: 1,
    });
    console.log('Document written with ID: ', docRef.id);
  } else {
    updateSearchString(String(prev.id));
  }
};

const getTopRatedSearching = async () => {
  let list: Searching[] = [];
  const searchRef = collection(db, 'search');
  const q = query(searchRef, orderBy('count', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => list.push({ ...(doc.data() as Searching), id: doc.id }));
  return list.slice(0, 5);
};

export { getLike, like, dislike, getTopRatedLike, getLikeByUserId, addSearchString, getTopRatedSearching };
