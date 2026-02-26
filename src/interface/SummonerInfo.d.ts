export interface lcuSummonerInfo {
  accountId: number;
  displayName: string;
  gameName:string;
  internalName: string;
  nameChangeFlag: boolean;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: IRerollPoint;
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
  tagLine: number;
  httpStatus?: number;
  inWitchTeam:number = 0;
  horse:string = '';
  score:number = 0;
  winRate:string = '';
}

interface SumReslut {
  name: string;
  imgUrl: string;
  lv: number;
  xpSL: number;
  xpNL: number;
  puuid: string;
  currentId: number;
  horse:string = '';
  score:number = 0;
  displayName:string = '';
}

interface ExcelChamp {
  champImgUrl: string,
  champLevel: string,
  championPoints: string,
  champLabel: string
}

export interface SumInfoRes {
  sumInfo: SumReslut,
  rankPoint: string[],
  excelChamp: ExcelChamp[]
}

export interface NoticeTypes {
  gameflow: string;
  is_party: boolean;
  is_muted: boolean;
  sumId: string;

}

export interface HeaderTypes {
  page: number,
  handleChange: any,
  localSumId: number,
  sumId: number,
  matchMode: string,
  handleSelect:any
}
