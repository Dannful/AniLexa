import { gql } from "../../__generated__/gql";

export const MEDIA_LIST_QUERY = gql(`
  query MediaListQuery($mediaId: Int) {
    MediaList(mediaId: $mediaId) {
      ...MediaListFragment
    }
  }
  `);
