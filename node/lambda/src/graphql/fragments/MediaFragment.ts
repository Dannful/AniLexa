import { gql } from "../../__generated__/gql";

export const MEDIA_FRAGMENT = gql(`
  fragment MediaFragment on Media {
    id
    description
    episodes
    nextAiringEpisode {
      episode
      timeUntilAiring
    }
  }
  `);
