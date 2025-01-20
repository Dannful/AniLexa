package com.github.dannful.AniLexa.handlers;

import static com.amazon.ask.request.Predicates.intentName;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;
import com.github.dannful.AniLexa.Constants;
import java.util.Optional;

public class HelpIntentHandler implements RequestHandler {

  @Override
  public boolean canHandle(HandlerInput input) {
    return input.matches(intentName("AMAZON.HelpIntent"));
  }

  @Override
  public Optional<Response> handle(HandlerInput input) {
    String speechText = "You can manage your anime list with me!";
    return input
      .getResponseBuilder()
      .withSpeech(speechText)
      .withSimpleCard(Constants.APP_ID, speechText)
      .withReprompt(speechText)
      .build();
  }
}
