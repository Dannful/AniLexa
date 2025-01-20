import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";

import { APP_ID } from "..";
import { MediaRepository } from "../domain/repository/MediaRepository";
import { aniListRepository } from "../data/repository/AniListRepository";
import { Media } from "../domain/model/media";
import { MediaListStatus } from "../domain/model/mediaListStatus";

const PROGRESS_SLOT = "Progress";
const TITLE_SLOT = "Title";
const SCORE_SLOT = "Score";
const MEDIA_ATTRIBUTE = "Media";

export const UpdateMediaListIntentHandler: RequestHandler = {
  canHandle: function (input: HandlerInput): boolean {
    const request = input.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "UpdateMediaListIntent"
    );
  },
  handle: async function (input: HandlerInput): Promise<Response> {
    const accessToken = input.requestEnvelope.context.System.user.accessToken;

    if (accessToken === undefined) {
      const speech =
        "You are not authenticated with AniList. Link your AniList account in your Amazon Alexa app";
      return input.responseBuilder
        .withSimpleCard(APP_ID, speech)
        .speak(speech)
        .getResponse();
    }

    const intentRequest = input.requestEnvelope.request as IntentRequest;
    const slots = intentRequest.intent.slots;

    if (
      slots === undefined ||
      slots[TITLE_SLOT].value === undefined ||
      slots[PROGRESS_SLOT].value === undefined
    )
      return input.responseBuilder
        .addDelegateDirective(intentRequest.intent)
        .getResponse();

    const sessionAttributes = input.attributesManager.getSessionAttributes();
    const title = slots[TITLE_SLOT].value!;
    const progress = Number(slots[PROGRESS_SLOT].value!);

    const repository: MediaRepository = aniListRepository;

    if (!(MEDIA_ATTRIBUTE in sessionAttributes)) {
      console.log(`title: ${title}`);
      const media = await repository.searchMedia(title);
      if (media === null) {
        const speech = `I couldn't find any show for the title ${title}`;
        return input.responseBuilder
          .withSimpleCard(APP_ID, speech)
          .speak(speech)
          .getResponse();
      }
      sessionAttributes[MEDIA_ATTRIBUTE] = media;
      input.attributesManager.setSessionAttributes(sessionAttributes);
    }
    const media = sessionAttributes[MEDIA_ATTRIBUTE] as Media;
    let score: number | undefined = undefined;
    if (media.episodes === progress) {
      const fetchedScore = slots[SCORE_SLOT].value;
      if (fetchedScore === undefined)
        return input.responseBuilder
          .addDelegateDirective(intentRequest.intent)
          .getResponse();
      score = Number(fetchedScore);
    }
    const newStatus: MediaListStatus =
      media.episodes === null || progress < media.episodes
        ? "CURRENT"
        : "COMPLETED";
    await repository.updateMediaList(accessToken, media.id, {
      progress: progress,
      score: score,
      status: newStatus,
    });
    const speech = `Updated ${title} to ${progress}`;
    return input.responseBuilder
      .withSimpleCard(APP_ID, speech)
      .speak(speech)
      .getResponse();
  },
};
