package com.github.dannful.AniLexa.handlers;

import static com.amazon.ask.request.Predicates.requestType;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.LaunchRequest;
import com.amazon.ask.model.Response;
import com.github.dannful.AniLexa.Constants;
import java.util.Optional;

public class LaunchRequestHandler implements RequestHandler {

  @Override
  public boolean canHandle(HandlerInput input) {
    return input.matches(requestType(LaunchRequest.class));
  }

  @Override
  public Optional<Response> handle(HandlerInput input) {
    String speechText = "Welcome to the AniLexa skill! I can assist you in managing your anime list";
    return input
      .getResponseBuilder()
      .withSpeech(speechText)
      .withSimpleCard(Constants.APP_ID, speechText)
      .withReprompt(speechText)
      .build();
  }
}
