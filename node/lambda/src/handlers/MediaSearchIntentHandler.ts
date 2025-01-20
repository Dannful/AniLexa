import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Request, Response } from "ask-sdk-model";

import { MediaRepository } from "../domain/repository/MediaRepository";
import { aniListRepository } from "../data/repository/AniListRepository";

import { APP_ID } from "..";

const TITLE_SLOT = "Title";

export const MediaSearchIntentHandler: RequestHandler = {
  canHandle: function (input: HandlerInput): boolean {
    const request = input.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name == "MediaSearchIntent"
    );
  },
  handle: async function (input: HandlerInput): Promise<Response> {
    const request = input.requestEnvelope.request as IntentRequest;
    const slots = request.intent.slots!;
    const query = slots[TITLE_SLOT].value!;

    const mediaRepository: MediaRepository = aniListRepository;

    const media = await mediaRepository.searchMedia(query);

    if (media === null) {
      const speech = `I couldn't find any shows for the title ${query}`;
      return input.responseBuilder
        .withSimpleCard(APP_ID, speech)
        .speak(speech)
        .getResponse();
    }

    const description = media.description.replace(
      new RegExp("<[^>]*>", "gm"),
      "",
    );

    console.log(description);

    return input.responseBuilder
      .withSimpleCard(APP_ID, description)
      .speak(description)
      .getResponse();
  },
};
