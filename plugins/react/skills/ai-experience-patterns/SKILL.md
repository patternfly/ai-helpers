---
name: ai-experience-patterns
description: Apply established UI/UX design patterns when building AI-powered product demos and experiences. Use this skill whenever the user mentions "AI experience", "AI powered", "AI supported", "product demo", or when building prototypes that involve AI features like chat interfaces, generation flows, loading states, or AI-assisted interactions. Make sure to use this skill even when users don't explicitly ask for design guidance - proactively apply these patterns to create polished AI experiences.
---

# AI Experience Design Patterns

This skill helps you build AI-powered product demos and experiences that follow established UI/UX patterns. When building AI features, you should proactively apply these design patterns to create polished, user-friendly experiences.

## When to use this skill

Apply this skill when the user is building:
- AI chat interfaces or conversational UIs
- AI generation features (text, images, code, etc.)
- AI-assisted workflows or copilot experiences
- Product demos showcasing AI capabilities
- Prototypes with AI-powered features
- Any interface where AI is performing actions for the user

## How this skill works

1. **Identify applicable patterns** - Determine which AI UX patterns are relevant to what the user is building
2. **Apply patterns while building** - Incorporate the design guidelines into the implementation
3. **Show reference materials** - If reference images exist in the `references/` folder, display relevant do's and don'ts to the user
4. **Document what you applied** - Tell the user which patterns you followed and why

## Common AI UX Patterns

### Loading & Processing States
AI operations often take time. Users need clear feedback about what's happening.

**Key considerations:**
- Show that the AI is "thinking" or processing
- Provide progress indicators when possible
- Set appropriate expectations for wait times
- Allow users to cancel long-running operations
- Show intermediate results if generation is incremental

**When to apply:** Any time AI is generating content, analyzing data, or performing complex operations

### Input Patterns
How users provide information to AI systems matters.

**Key considerations:**
- Make it clear what kind of input the AI expects
- Provide examples or suggestions to guide users
- Support both simple and advanced input modes
- Show character/token limits when relevant
- Allow editing and refinement of inputs

**When to apply:** Chat interfaces, prompt inputs, configuration screens for AI features

### Output & Results Display
AI outputs need special treatment to be useful and trustworthy.

**Key considerations:**
- Clearly distinguish AI-generated content from human content
- Format outputs appropriately (code blocks, markdown, structured data)
- Provide options to regenerate, refine, or edit results
- Show confidence levels or certainty when available
- Make outputs easy to copy, export, or integrate

**When to apply:** Displaying any AI-generated content

### Error States & Failures
AI systems can fail in unique ways that need thoughtful handling.

**Key considerations:**
- Explain what went wrong in user-friendly language
- Provide actionable next steps (retry, rephrase, etc.)
- Don't expose technical errors or model limitations directly
- Offer alternatives when the AI can't complete a task
- Gracefully handle rate limits, timeouts, and service issues

**When to apply:** Any error handling for AI features

### Transparency & Control
Users need to understand and control AI behavior.

**Key considerations:**
- Be clear when AI is involved vs. deterministic logic
- Allow users to configure AI behavior when appropriate
- Provide visibility into how AI made decisions
- Give users control over accepting/rejecting AI suggestions
- Show sources or reasoning when relevant

**When to apply:** All AI features, especially those that make decisions or suggestions

### Streaming & Incremental Results
Many AI systems generate results progressively.

**Key considerations:**
- Stream results as they're generated (don't wait for completion)
- Make partial results clearly readable
- Allow interaction with partial results when possible
- Handle interruptions gracefully
- Provide stop/pause controls

**When to apply:** Text generation, code generation, any incremental AI output

## Workflow

### Step 1: Identify patterns needed

Before you start building, analyze the user's request and determine which patterns apply. For example:
- Building a chat interface → Input patterns, Output display, Streaming
- Creating an AI code generator → Loading states, Output display, Error handling
- Building a demo → Multiple patterns, emphasis on polish

### Step 2: Build following the patterns

As you implement the feature:
- Apply the patterns described above
- Make deliberate choices based on the guidelines
- Prioritize user experience and polish
- Consider edge cases the patterns address
- If reference images exist in the `references/` folder, read and display the relevant ones to the user

### Step 3: Document what you applied

When you present the finished work, explain which patterns you used and why. For example:

"I've implemented the chat interface following these AI UX patterns:

- **Streaming results**: Messages appear word-by-word as the AI generates them, with a pulsing indicator while processing
- **Clear attribution**: AI messages are visually distinct with an icon and background color
- **Regeneration control**: Each AI response has a regenerate button for trying alternative answers
- **Error handling**: Network failures show a friendly retry option rather than technical errors

These follow the guidelines from [reference the specific images you used]."

## Reference Materials (Optional)

The `references/` folder can contain visual examples of do's and don'ts for AI UX patterns. If populated, read and display relevant images when applying patterns. See `references/README.md` for the naming convention.

## Tips for great AI experiences

**Progressive disclosure**: Start simple and reveal complexity as needed. Don't overwhelm users with all AI capabilities at once.

**Appropriate defaults**: Make the most common use case work with zero configuration. Advanced controls should be optional.

**Feedback loops**: Let users rate, correct, or refine AI outputs. This improves both the immediate result and signals quality.

**Performance perception**: Use optimistic UI updates and streaming to make AI feel faster, even when processing takes time.

**Fallback gracefully**: Always have a non-AI path when things fail. Never leave users stuck because the AI isn't working.

## Notes

- These patterns are guidelines, not rigid rules. Apply them thoughtfully based on context.
- When in doubt, prioritize clarity and user control over cleverness.
- If reference images are available, use them as additional guidance.
- If the user's request conflicts with the patterns, ask for clarification rather than silently deviating.
