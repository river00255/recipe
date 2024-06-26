import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Likes, RecipeReview, Searching } from '../type';
import { db } from '@/lib/firebase';
import { deleteImage, getImagePath } from './file';

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
  return { data: list, totalElements, totalPages };
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
    return docRef.id;
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

const addReview = async (review: RecipeReview) => {
  try {
    const docRef = await addDoc(collection(db, 'review'), review);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getReview = async ({ page }: { page: number }) => {
  const perPage = 20;
  let list: RecipeReview[] = [];
  const reviewRef = collection(db, 'review');
  const q = query(reviewRef, orderBy('createdAt', 'desc'));
  const docSnapshot = await getDocs(q);
  docSnapshot.forEach((doc) =>
    list.push({ ...(doc.data() as RecipeReview), id: doc.id, createdAt: doc.data().createdAt.toDate() })
  );
  const totalElements = list.length;
  const totalPages = Math.ceil(totalElements / perPage);
  if (page <= 1) {
    list = list.slice(0, page * perPage);
  } else {
    list = list.slice((page - 1) * perPage, page * perPage);
  }
  return { data: list, totalElements, totalPages };
};

const getReviewByUserId = async ({ userId, page }: { userId: string; page: number }) => {
  const perPage = 20;
  let list: RecipeReview[] = [];
  const reviewRef = collection(db, 'review');
  const q = query(reviewRef, where('userId', '==', userId));
  const docSnapshot = await getDocs(q);
  docSnapshot.forEach((doc) =>
    list.push({ ...(doc.data() as RecipeReview), id: doc.id, createdAt: doc.data().createdAt.toDate() })
  );
  list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const totalElements = list.length;
  const totalPages = Math.ceil(totalElements / perPage);
  if (page <= 1) {
    list = list.slice(0, page * perPage);
  } else {
    list = list.slice((page - 1) * perPage, page * perPage);
  }
  return { data: list, totalElements, totalPages };
};

const updateReview = async ({ id, text, url, userId }: { id: string; text: string; url: string; userId: string }) => {
  const reviewRef = doc(db, 'review', id);
  const docSnapshot = await getDoc(reviewRef);
  if (docSnapshot.exists()) {
    const prev = { ...docSnapshot.data(), id } as RecipeReview;
    const date = new Date();
    if (prev.userId !== userId) return;
    await updateDoc(reviewRef, {
      text,
      url,
      updatedAt: date,
    });
  } else {
    console.log('No such review!');
  }
};

const deleteReview = async ({ id, userId }: { id: string; userId: string }) => {
  const reviewRef = doc(db, 'review', id);
  const docSnapshot = await getDoc(reviewRef);
  if (docSnapshot.exists()) {
    const review = { ...docSnapshot.data(), id } as RecipeReview;
    const url = docSnapshot.data().url;
    if (review.userId !== userId) return;
    await deleteDoc(reviewRef);
    if (url.length > 0) deleteImage({ path: getImagePath(url), userId });
  }
};

export {
  getLike,
  like,
  dislike,
  getTopRatedLike,
  getLikeByUserId,
  addSearchString,
  getTopRatedSearching,
  addReview,
  getReview,
  getReviewByUserId,
  updateReview,
  deleteReview,
};
