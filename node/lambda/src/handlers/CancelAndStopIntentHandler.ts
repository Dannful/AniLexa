import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { APP_ID } from "..";

export const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.CancelIntent" ||
        request.intent.name === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = "Goodbye!";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(APP_ID, speakOutput)
      .getResponse();
  },
};
