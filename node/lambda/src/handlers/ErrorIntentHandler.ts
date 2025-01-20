import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { APP_ID } from "..";

export const ErrorIntentHandler: ErrorHandler = {
  canHandle(): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withSimpleCard(APP_ID, speakOutput)
      .getResponse();
  },
};
