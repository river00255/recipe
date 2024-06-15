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

const response = {
  RCP_SEQ: '일련번호',
  RCP_NM: '메뉴명',
  RCP_WAY2: '조리방법',
  RCP_PAT2: '요리종류',
  INFO_WGT: '중량(1인분)',
  INFO_ENG: '열량',
  INFO_CAR: '탄수화물',
  INFO_PRO: '단백질',
  INFO_FAT: '지방',
  INFO_NA: '나트륨',
  HASH_TAG: '해쉬태그',
  ATT_FILE_NO_MAIN: '이미지경로(소)',
  ATT_FILE_NO_MK: '이미지경로(대)',
  RCP_PARTS_DTLS: '재료정보',
  RCP_NA_TIP: '저감 조리법 TIP',
  MANUAL01: '만드는법_01',
  MANUAL_IMG01: '만드는법_이미지_01',
};