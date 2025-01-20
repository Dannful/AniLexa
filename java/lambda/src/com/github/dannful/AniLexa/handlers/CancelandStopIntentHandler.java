package com.github.dannful.AniLexa.handlers;

import static com.amazon.ask.request.Predicates.intentName;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;
import com.github.dannful.AniLexa.Constants;
import java.util.Optional;

public class CancelandStopIntentHandler implements RequestHandler {

  @Override
  public boolean canHandle(HandlerInput input) {
    return input.matches(
      intentName("AMAZON.StopIntent").or(intentName("AMAZON.CancelIntent"))
    );
  }

  @Override
  public Optional<Response> handle(HandlerInput input) {
    String speechText = "Goodbye";
    return input
      .getResponseBuilder()
      .withSpeech(speechText)
      .withSimpleCard(Constants.APP_ID, speechText)
      .build();
  }
}
