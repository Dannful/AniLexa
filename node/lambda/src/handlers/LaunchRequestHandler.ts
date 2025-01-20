import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { APP_ID } from "..";

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput =
      "Welcome to the AniLexa skill! I can assist you in managing your anime list";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withSimpleCard(APP_ID, speakOutput)
      .getResponse();
  },
};
