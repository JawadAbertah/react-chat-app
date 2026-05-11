import data from '../data/responses.json'

/**
 * Finds the best matching response from responses.json based on user input.
 * Matching is done by checking if any trigger keyword appears in the user message.
 * Returns a random matching response, or a random default if none match.
 */
export function getAriaResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim()

  // Collect all responses whose triggers match the user message
  const matched = data.responses.filter(r =>
    r.triggers.length > 0 && r.triggers.some(t => msg.includes(t.toLowerCase()))
  )

  if (matched.length > 0) {
    // Pick randomly among matches
    return matched[Math.floor(Math.random() * matched.length)].message
  }

  // Fallback: random default response
  const defaults = data.defaultResponses
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export function getTypingDelay() {
  const { min, max } = data.typingDelay
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const botInfo = data.bot
