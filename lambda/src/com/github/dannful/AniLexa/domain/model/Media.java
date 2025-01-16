package com.github.dannful.AniLexa.domain.model;

public record Media(
  int id,
  String description,
  Integer episodes,
  NextAiringEpisode nextAiringEpisode
) {}
