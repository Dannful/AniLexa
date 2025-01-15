package com.github.dannful.AniLexa.domain.model;

public record Media(
    int id,
    Integer episodes,
    NextAiringEpisode nextAiringEpisode
) {
}
