package com.github.dannful.AniLexa.domain.model;

public record MediaList(
  int id,
  int mediaId,
  int progress,
  float score,
  MediaListStatus status
) {}
