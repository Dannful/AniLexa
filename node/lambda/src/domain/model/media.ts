export type Media = {
  id: number;
  description: string;
  episodes: number | null;
  nextAiringEpisode: {
    episode: number;
    timeUntilAiring: number;
  } | null;
};
