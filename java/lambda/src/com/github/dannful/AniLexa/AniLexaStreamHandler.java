package com.github.dannful.AniLexa;

import com.amazon.ask.Skill;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.Skills;
import com.github.dannful.AniLexa.handlers.CancelandStopIntentHandler;
import com.github.dannful.AniLexa.handlers.FallbackIntentHandler;
import com.github.dannful.AniLexa.handlers.HelpIntentHandler;
import com.github.dannful.AniLexa.handlers.LaunchRequestHandler;
import com.github.dannful.AniLexa.handlers.MediaSearchIntentHandler;
import com.github.dannful.AniLexa.handlers.SessionEndedRequestHandler;
import com.github.dannful.AniLexa.handlers.UpdateMediaListIntent;

public class AniLexaStreamHandler extends SkillStreamHandler {

  @SuppressWarnings("unchecked")
  private static Skill getSkill() {
    return Skills.standard()
      .addRequestHandlers(
        new CancelandStopIntentHandler(),
        new HelpIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedRequestHandler(),
        new FallbackIntentHandler(),
        new UpdateMediaListIntent(),
        new MediaSearchIntentHandler()
      )
      .build();
  }

  public AniLexaStreamHandler() {
    super(getSkill());
  }
}
