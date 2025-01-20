/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment MediaFragment on Media {\n    id\n    description\n    episodes\n    nextAiringEpisode {\n      episode\n      timeUntilAiring\n    }\n  }\n  ": types.MediaFragmentFragmentDoc,
    "\n  fragment MediaListFragment on MediaList {\n    id\n    mediaId\n    progress\n    score\n    status\n  }\n  ": types.MediaListFragmentFragmentDoc,
    "\n  mutation MediaListMutation($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus) {\n    SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status) {\n      ...MediaListFragment\n    }\n  }\n  ": types.MediaListMutationDocument,
    "\n  query MediaListQuery($mediaId: Int) {\n    MediaList(mediaId: $mediaId) {\n      ...MediaListFragment\n    }\n  }\n  ": types.MediaListQueryDocument,
    "\n  query MediaQuery($mediaTitle: String) {\n    Media(search: $mediaTitle, type: ANIME) {\n      ...MediaFragment\n    }\n  }\n  ": types.MediaQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MediaFragment on Media {\n    id\n    description\n    episodes\n    nextAiringEpisode {\n      episode\n      timeUntilAiring\n    }\n  }\n  "): (typeof documents)["\n  fragment MediaFragment on Media {\n    id\n    description\n    episodes\n    nextAiringEpisode {\n      episode\n      timeUntilAiring\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MediaListFragment on MediaList {\n    id\n    mediaId\n    progress\n    score\n    status\n  }\n  "): (typeof documents)["\n  fragment MediaListFragment on MediaList {\n    id\n    mediaId\n    progress\n    score\n    status\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MediaListMutation($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus) {\n    SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status) {\n      ...MediaListFragment\n    }\n  }\n  "): (typeof documents)["\n  mutation MediaListMutation($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus) {\n    SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status) {\n      ...MediaListFragment\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MediaListQuery($mediaId: Int) {\n    MediaList(mediaId: $mediaId) {\n      ...MediaListFragment\n    }\n  }\n  "): (typeof documents)["\n  query MediaListQuery($mediaId: Int) {\n    MediaList(mediaId: $mediaId) {\n      ...MediaListFragment\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MediaQuery($mediaTitle: String) {\n    Media(search: $mediaTitle, type: ANIME) {\n      ...MediaFragment\n    }\n  }\n  "): (typeof documents)["\n  query MediaQuery($mediaTitle: String) {\n    Media(search: $mediaTitle, type: ANIME) {\n      ...MediaFragment\n    }\n  }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;