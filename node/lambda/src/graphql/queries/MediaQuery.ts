import { gql } from "../../__generated__/gql";

export const MEDIA_QUERY = gql(`
  query MediaQuery($mediaTitle: String) {
    Media(search: $mediaTitle, type: ANIME) {
      ...MediaFragment
    }
  }
  `);
