import { SkillBuilders } from "ask-sdk-core";

import { ErrorIntentHandler } from "./handlers/ErrorIntentHandler";
import { FallbackIntentHandler } from "./handlers/FallbackIntentHandler";
import { HelpIntentHandler } from "./handlers/HelpIntentHandler";
import { LaunchRequestHandler } from "./handlers/LaunchRequestHandler";
import { SessionEndedRequestHandler } from "./handlers/SessionEndedRequestHandler";
import { MediaSearchIntentHandler } from "./handlers/MediaSearchIntentHandler";
import { UpdateMediaListIntentHandler } from "./handlers/UpdateMediaListIntentHandler";

export const APP_ID = "AniLexa";

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FallbackIntentHandler,
    HelpIntentHandler,
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    MediaSearchIntentHandler,
    UpdateMediaListIntentHandler,
  )
  .addErrorHandlers(ErrorIntentHandler)
  .lambda();
