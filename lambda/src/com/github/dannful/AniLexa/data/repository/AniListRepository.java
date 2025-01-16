package com.github.dannful.AniLexa.data.repository;

import com.github.dannful.AniLexa.domain.model.Media;
import com.github.dannful.AniLexa.domain.model.MediaList;
import com.github.dannful.AniLexa.domain.model.MediaListStatus;
import com.github.dannful.AniLexa.domain.repository.AnimeRepository;
import com.github.dannful.AniLexa.utils.ClassSerializer;
import com.google.gson.Gson;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.json.JSONObject;

public class AniListRepository implements AnimeRepository {

  private final String accessToken;

  public AniListRepository(String accessToken) {
    this.accessToken = accessToken;
  }

  public AniListRepository() {
    this.accessToken = null;
  }

  private record KeyValuePair(String key, Object value) {}

  private String makeRequest(String body, KeyValuePair... variables) {
    HttpClient client = HttpClient.newBuilder().build();

    JSONObject bodyObject = new JSONObject();

    JSONObject variablesObject = new JSONObject();
    for (KeyValuePair keyValuePair : variables) variablesObject.put(
      keyValuePair.key,
      keyValuePair.value
    );
    bodyObject.put("variables", variablesObject);

    bodyObject.put("query", body);

    HttpRequest.Builder builder = HttpRequest.newBuilder(
      URI.create("https://graphql.anilist.co")
    )
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      .POST(HttpRequest.BodyPublishers.ofString(bodyObject.toString()));

    if (this.accessToken != null) builder = builder.header(
      "Authorization",
      "Bearer " + this.accessToken
    );

    HttpRequest request = builder.build();

    try {
      String response = client
        .send(request, HttpResponse.BodyHandlers.ofString())
        .body();

      JSONObject object = new JSONObject(response);

      return object.get("data").toString();
    } catch (Exception e) {
      return null;
    }
  }

  private <T> void includeVariable(
    List<KeyValuePair> variables,
    String key,
    Optional<T> variable
  ) {
    variable.ifPresent(t -> variables.add(new KeyValuePair(key, t)));
  }

  @Override
  public Media searchMedia(String englishTitle) {
    String response = makeRequest(
      "query($mediaTitle: String) { Media(search: $mediaTitle, type: ANIME) { " +
      ClassSerializer.formatClassFields(Media.class) +
      " } }",
      new KeyValuePair("mediaTitle", englishTitle)
    );
    if (response == null) return null;
    Gson gson = new Gson();
    return gson.fromJson(
      new JSONObject(response).get("Media").toString(),
      Media.class
    );
  }

  @Override
  public MediaList searchMediaList(int mediaId) {
    String response = makeRequest(
      "query($mediaId: Int) { MediaList(mediaId: $mediaId) { " +
      ClassSerializer.formatClassFields(MediaList.class) +
      " } }",
      new KeyValuePair("mediaId", mediaId)
    );
    if (response == null) return null;
    Gson gson = new Gson();
    return gson.fromJson(
      new JSONObject(response).get("MediaList").toString(),
      MediaList.class
    );
  }

  @Override
  public void updateMediaList(
    int mediaId,
    Optional<Integer> progress,
    Optional<Float> score,
    Optional<MediaListStatus> status
  ) {
    List<KeyValuePair> variables = new ArrayList<>();
    variables.add(new KeyValuePair("mediaId", mediaId));
    includeVariable(variables, "progress", progress);
    includeVariable(variables, "score", score);
    includeVariable(variables, "status", status.map(Enum::name));
    makeRequest(
      "mutation($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus) { SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status) { progress } }",
      variables.toArray(new KeyValuePair[] {})
    );
  }
}
