export type Res = {
  COOKRCP01: {
    total_count: number;
    row: Recipe[];
    RESULT: {
      MSG: string;
      CODE: string;
    };
  };
};

export type Recipe = {
  RCP_SEQ: string;
  RCP_NM: string;
  RCP_WAY2: string;
  RCP_PAT2: string;
  INFO_WGT: string;
  INFO_ENG: string;
  INFO_CAR: string;
  INFO_PRO: string;
  INFO_FAT: string;
  INFO_NA: string;
  HASH_TAG: string;
  ATT_FILE_NO_MAIN: string;
  ATT_FILE_NO_MK: string;
  RCP_PARTS_DTLS: string;
  RCP_NA_TIP: string;
} & Manual;

type Manual = {
  MANUAL01: string;
  MANUAL_IMG01: string;
  MANUAL02: string;
  MANUAL_IMG02: string;
  MANUAL03: string;
  MANUAL_IMG03: string;
  MANUAL04: string;
  MANUAL_IMG04: string;
  MANUAL05: string;
  MANUAL_IMG05: string;
  MANUAL06: string;
  MANUAL_IMG06: string;
  MANUAL07: string;
  MANUAL_IMG07: string;
  MANUAL08: string;
  MANUAL_IMG08: string;
  MANUAL09: string;
  MANUAL_IMG09: string;
  MANUAL10: string;
  MANUAL_IMG10: string;
  [key: string]: string;
};

export type Likes = {
  recipe: {
    id: string;
    name: string;
    category: string;
    thumbnailUrl: string;
  };
  like: {
    userId: string[];
    count: number;
  };
};

export type Searching = {
  id?: string;
  text: string;
  count: string;
};

export type RecipeReview = {
  id?: string;
  text: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
};
