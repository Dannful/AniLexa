import { gql } from "../../__generated__/gql";

export const MEDIA_LIST_MUTATION = gql(`
  mutation MediaListMutation($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status) {
      ...MediaListFragment
    }
  }
  `);
