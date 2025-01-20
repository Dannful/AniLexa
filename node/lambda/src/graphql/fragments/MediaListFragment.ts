import { gql } from "../../__generated__/gql";

export const MEDIA_LIST_FRAGMENT = gql(`
  fragment MediaListFragment on MediaList {
    id
    mediaId
    progress
    score
    status
  }
  `);
