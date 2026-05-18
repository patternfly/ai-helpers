# Reference Image Mapping

Use this table during Step 3 of the review workflow to select the correct reference image for each failed check. All images are in the `references/` folder.

## Transparency failures

| Failed Check                       | Show This Reference                                                       |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Missing transparency notice        | `transparency-notices-features.png` or `transparency-notices-chatbot.png` |
| Missing visual indicator           | `transparency-requirement.png`                                            |
| Missing verbal indicator           | `transparency-requirement.png`                                            |
| Missing "review AI content" notice | `transparency-notices-chatbot.png`                                        |
| Missing AI-generated content label | `ai-generated-content-label.png`                                          |

## Icon failures

| Failed Check                | Show This Reference                                  |
| --------------------------- | ---------------------------------------------------- |
| Missing AI sparkle icon     | `ai-icons-overview.png`                              |
| Wrong icon type used        | `ai-icons-information.png` or `ai-icons-actions.png` |
| Icon without text pairing   | `icons-do-this.png`                                  |
| Custom/non-standard AI icon | `icons-dont-create-new.png`                          |
| AI icon without disclosure  | `icons-dont-use-without-disclosure.png`              |

## Color/styling failures

| Failed Check               | Show This Reference      |
| -------------------------- | ------------------------ |
| Gradient used for AI       | `color-no-gradients.png` |
| Special AI color coding    | `color-dos-donts.png`    |
| Gradient on AI label/badge | `color-no-gradients.png` |

## Chatbot failures

| Failed Check                     | Show This Reference           |
| -------------------------------- | ----------------------------- |
| Missing robot avatar             | `chatbot-avatar-robot.png`    |
| Wrong chatbot avatar             | `chatbot-avatar-donts.png`    |
| Robot icon for non-chatbot       | `chatbot-avatar-donts.png`    |
| Gradient on launch button        | `chatbot-donts-gradients.png` |
| Gradient on chat button/launcher | `chatbot-donts-gradients.png` |
| Wrong avatar color/size          | `chatbot-avatar-in-use.png`   |

## Chat message styling failures

| Failed Check                        | Show This Reference                  |
| ----------------------------------- | ------------------------------------ |
| Gradient on chat message box        | `chat-message-dont-gradients.png`    |
| Wrong message background color      | `chat-messages-do-control-token.png` |
| Gradient used for thinking/progress | `chat-message-dont-gradients.png`    |
