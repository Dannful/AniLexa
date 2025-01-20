import { MediaListStatus } from "../../__generated__/graphql";

export type MediaList = {
  id: number;
  mediaId: number;
  progress: number;
  score: number;
  status: MediaListStatus;
};
