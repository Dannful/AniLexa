import { Media } from "../../domain/model/media";
import { MediaList } from "../../domain/model/mediaList";
import { MediaRepository } from "../../domain/repository/MediaRepository";

import { MEDIA_QUERY } from "../../graphql/queries/MediaQuery";
import { MEDIA_LIST_QUERY } from "../../graphql/queries/MediaListQuery";
import { MEDIA_LIST_MUTATION } from "../../graphql/queries/MediaListMutation";

import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { MediaListStatus as DataStatus } from "../../__generated__/graphql";
import { MediaListStatus } from "../../domain/model/mediaListStatus";

function domainToDataStatus(status: MediaListStatus): DataStatus {
  switch (status) {
    case "COMPLETED":
      return DataStatus.Completed;
    case "CURRENT":
      return DataStatus.Current;
    case "DROPPED":
      return DataStatus.Dropped;
    case "PAUSED":
      return DataStatus.Paused;
    case "PLANNING":
      return DataStatus.Planning;
    case "REPEATING":
      return DataStatus.Repeating;
  }
}

function getApolloClient(
  accessToken?: string,
): ApolloClient<NormalizedCacheObject> {
  const options: ApolloClientOptions<NormalizedCacheObject> = {
    cache: new InMemoryCache(),
    uri: "https://graphql.anilist.co",
  };
  if (accessToken !== undefined)
    options.headers = { Authorization: `Bearer ${accessToken}` };
  return new ApolloClient(options);
}

export const aniListRepository: MediaRepository = {
  searchMedia: async function (englishTitle: string): Promise<Media | null> {
    const client = getApolloClient();
    const response = await client.query({
      query: MEDIA_QUERY,
      variables: {
        mediaTitle: englishTitle,
      },
    });
    if (!response.data.Media) return null;
    return {
      id: response.data.Media.id,
      description: response.data.Media.description ?? "No description provided",
      episodes: response.data.Media.episodes ?? null,
      nextAiringEpisode: response.data.Media.nextAiringEpisode
        ? {
            episode: response.data.Media.nextAiringEpisode.episode,
            timeUntilAiring:
              response.data.Media.nextAiringEpisode.timeUntilAiring,
          }
        : null,
    };
  },
  searchMediaList: async function (
    accessToken: string,
    mediaId: number,
  ): Promise<MediaList | null> {
    const client = getApolloClient(accessToken);
    const response = await client.query({
      query: MEDIA_LIST_QUERY,
      variables: {
        mediaId: mediaId,
      },
    });
    if (!response.data.MediaList) return null;
    return {
      id: response.data.MediaList.id,
      mediaId: response.data.MediaList.mediaId!,
      progress: response.data.MediaList.progress!,
      score: response.data.MediaList.score!,
      status: response.data.MediaList.status!,
    };
  },
  updateMediaList: async function (
    accessToken: string,
    mediaId: number,
    variables: { progress?: number; score?: number; status?: MediaListStatus },
  ): Promise<void> {
    const client = getApolloClient(accessToken);
    await client.mutate({
      mutation: MEDIA_LIST_MUTATION,
      variables: {
        mediaId: mediaId,
        progress: variables.progress,
        score: variables.score,
        status:
          variables.status !== undefined
            ? domainToDataStatus(variables.status)
            : undefined,
      },
    });
  },
};
