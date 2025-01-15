package com.github.dannful.AniLexa.handlers;

import static com.amazon.ask.request.Predicates.intentName;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.IntentRequest;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.Slot;
import com.github.dannful.AniLexa.Constants;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

import com.github.dannful.AniLexa.data.repository.AniListRepository;
import com.github.dannful.AniLexa.domain.model.Media;
import com.github.dannful.AniLexa.domain.model.MediaListStatus;
import com.github.dannful.AniLexa.domain.repository.AnimeRepository;

public class UpdateMediaListIntent implements RequestHandler {

    private static final String PROGRESS_SLOT = "Progress";
    private static final String TITLE_SLOT = "Title";
    private static final String SCORE_SLOT = "Score";
    private static final String MEDIA_ATTRIBUTE = "Media";

    @SuppressWarnings("unchecked")
    private <T> T getSessionAttribute(
            HandlerInput input,
            String key,
            Function<String, T> convert
    ) {
        IntentRequest intentRequest = (IntentRequest) input
                .getRequestEnvelope()
                .getRequest();
        Map<String, Object> sessionAttributes = input
                .getAttributesManager()
                .getSessionAttributes();
        if (sessionAttributes.containsKey(key)) return (T) sessionAttributes.get(
                key
        );

        Map<String, Slot> slots = intentRequest.getIntent().getSlots();
        Slot slot = slots.get(key);

        if (slot == null || slot.getValue() == null) {
            return null;
        } else {
            T result = convert.apply(slot.getValue());
            sessionAttributes.put(key, result);
            input.getAttributesManager().setSessionAttributes(sessionAttributes);
            return result;
        }
    }

    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName("UpdateMediaListIntent"));
    }


    @Override
    public java.util.Optional<Response> handle(HandlerInput input) {
        IntentRequest intentRequest = (IntentRequest) input.getRequestEnvelope().getRequest();
        String accessToken = input
                .getRequestEnvelope()
                .getContext()
                .getSystem()
                .getUser()
                .getAccessToken();
        Map<String, Object> sessionAttributes = input
                .getAttributesManager()
                .getSessionAttributes();
        String title = getSessionAttribute(input, TITLE_SLOT, slot -> slot);
        Integer progress = getSessionAttribute(input, PROGRESS_SLOT, Integer::parseInt
        );

        if (accessToken == null) {
            String speech =
                    "You are not authenticated with AniList. Link your AniList account in your Amazon Alexa app";
            return input
                    .getResponseBuilder()
                    .withSpeech(speech)
                    .withLinkAccountCard()
                    .build();
        }

        if (title == null || progress == null) {
            return input
                    .getResponseBuilder()
                    .addDelegateDirective(intentRequest.getIntent())
                    .withShouldEndSession(false)
                    .build();
        }

        AnimeRepository animeRepository = new AniListRepository(accessToken);
        if (!sessionAttributes.containsKey(MEDIA_ATTRIBUTE)) {
            Media media = animeRepository.searchMedia(title);
            if (media == null) {
                String speech = "I couldn't find any anime for the title \"" + title + "\"";
                return input.getResponseBuilder().withSimpleCard(Constants.APP_ID, speech).withSpeech(speech).build();
            }
            sessionAttributes.put(MEDIA_ATTRIBUTE, media);
            input.getAttributesManager().setSessionAttributes(sessionAttributes);
        }
        Media media = (Media) sessionAttributes.get(MEDIA_ATTRIBUTE);
        Optional<Float> score = Optional.empty();
        if (Objects.equals(media.episodes(), progress)) {
            Float fetchedScore = getSessionAttribute(input, SCORE_SLOT, Float::parseFloat);
            if (fetchedScore == null) {
                return input
                        .getResponseBuilder()
                        .addDelegateDirective(intentRequest.getIntent())
                        .withShouldEndSession(false)
                        .build();
            }
            score = Optional.of(fetchedScore);
        }
        Optional<MediaListStatus> mediaListStatus = Optional.of(media.episodes() == null || progress < media.episodes() ? MediaListStatus.CURRENT : MediaListStatus.COMPLETED);
        animeRepository.updateMediaList(media.id(), Optional.of(progress), score, mediaListStatus);
        String speech = "Updated " + title + " to " + progress;
        return input
                .getResponseBuilder()
                .withSpeech(speech)
                .withSimpleCard(Constants.APP_ID, speech)
                .withShouldEndSession(true)
                .build();
    }
}
