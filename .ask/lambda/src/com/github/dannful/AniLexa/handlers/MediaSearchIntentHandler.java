package com.github.dannful.AniLexa.handlers;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.impl.IntentRequestHandler;
import com.amazon.ask.model.IntentRequest;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.Slot;
import com.amazon.ask.request.Predicates;
import com.github.dannful.AniLexa.Constants;
import com.github.dannful.AniLexa.data.repository.AniListRepository;
import com.github.dannful.AniLexa.domain.model.Media;
import com.github.dannful.AniLexa.domain.repository.AnimeRepository;
import java.util.Map;
import java.util.Optional;

public class MediaSearchIntentHandler implements IntentRequestHandler {

  private static final String TITLE_SLOT = "Title";

  @Override
  public boolean canHandle(HandlerInput input, IntentRequest intentRequest) {
    return input.matches(Predicates.intentName("MediaSearchIntent"));
  }

  @Override
  public Optional<Response> handle(
    HandlerInput input,
    IntentRequest intentRequest
  ) {
    Map<String, Slot> slots = intentRequest.getIntent().getSlots();

    String query = slots.get(TITLE_SLOT).getValue();

    AnimeRepository animeRepository = new AniListRepository();
    Media media = animeRepository.searchMedia(query);

    if (media == null) {
      String speech = "I couldn't find any anime for the title " + query;
      return input
        .getResponseBuilder()
        .withSimpleCard(Constants.APP_ID, speech)
        .withSpeech(speech)
        .build();
    }

    String description = media.description().replaceAll("<[^>]*>", "");
    System.out.println(description);

    return input.getResponseBuilder().withSpeech(description).build();
  }
}
