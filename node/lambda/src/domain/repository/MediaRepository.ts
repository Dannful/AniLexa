import { MediaListStatus } from "../model/mediaListStatus";
import { Media } from "../model/media";
import { MediaList } from "../model/mediaList";

export type MediaRepository = {
  searchMedia: (englishTitle: string) => Promise<Media | null>;
  searchMediaList: (
    accessToken: string,
    mediaId: number,
  ) => Promise<MediaList | null>;
  updateMediaList: (
    accessToken: string,
    mediaId: number,
    variables: {
      progress?: number;
      score?: number;
      status?: MediaListStatus;
    },
  ) => Promise<void>;
};
