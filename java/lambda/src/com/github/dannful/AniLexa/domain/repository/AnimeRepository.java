package com.github.dannful.AniLexa.domain.repository;

import com.github.dannful.AniLexa.domain.model.Media;
import com.github.dannful.AniLexa.domain.model.MediaList;
import com.github.dannful.AniLexa.domain.model.MediaListStatus;

import java.util.Optional;

public interface AnimeRepository {

  Media searchMedia(String englishTitle);
  MediaList searchMediaList(int mediaId);

  void updateMediaList(int mediaId, Optional<Integer> progress, Optional<Float> score, Optional<MediaListStatus> status);
}
