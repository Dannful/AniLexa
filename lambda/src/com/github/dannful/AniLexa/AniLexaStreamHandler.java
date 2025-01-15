package com.github.dannful.AniLexa;

import com.amazon.ask.Skill;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.Skills;
import com.github.dannful.AniLexa.handlers.CancelandStopIntentHandler;
import com.github.dannful.AniLexa.handlers.FallbackIntentHandler;
import com.github.dannful.AniLexa.handlers.UpdateMediaListIntent;
import com.github.dannful.AniLexa.handlers.HelpIntentHandler;
import com.github.dannful.AniLexa.handlers.LaunchRequestHandler;
import com.github.dannful.AniLexa.handlers.SessionEndedRequestHandler;

public class AniLexaStreamHandler extends SkillStreamHandler {

  @SuppressWarnings("unchecked")
  private static Skill getSkill() {
    return Skills.standard()
      .addRequestHandlers(
        new CancelandStopIntentHandler(),
        new UpdateMediaListIntent(),
        new HelpIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedRequestHandler(),
        new FallbackIntentHandler()
      )
      .build();
  }

  public AniLexaStreamHandler() {
    super(getSkill());
  }
}
