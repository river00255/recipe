export const RecipeKeys = {
  all: ['recipe'] as const,
  lists: () => [...RecipeKeys.all, 'list'] as const,
  list: (category: string | null, currentPage: number) => [...RecipeKeys.all, 'list', category, currentPage] as const,
  detail: (name: string) => [...RecipeKeys.all, 'detail', name] as const,
  recommend: (index?: number) => [...RecipeKeys.all, 'recommend', index] as const,
  search: (type: 'RCP_NM' | 'RCP_PARTS_DTLS', searchWord: string, currentPage: number) =>
    [...RecipeKeys.all, 'search', type, searchWord, currentPage] as const,
  ranking: ['search', 'ranking'] as const,
};

export const ReviewKeys = {
  all: ['review'] as const,
  lists: () => [...ReviewKeys.all, 'list'] as const,
  list: (currentPage: number) => [...ReviewKeys.all, 'list', currentPage] as const,
  filteredList: (userId: string, currentPage: number) => [...ReviewKeys.all, 'list', userId, currentPage] as const,
};

export const LikeKeys = {
  item: (recipeId: string) => ['like', recipeId] as const,
  filteredList: (userId: string, currentPage: number) => ['like', userId, currentPage] as const,
  ranking: ['like', 'ranking'] as const,
};
