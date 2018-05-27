export class KoreanParser {
  static parse(input) {
    const parsed = {}

    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)

    if (lines.length === 0) {
      return parsed
    }

    parsed.source = lines[0]

    if (lines.length === 1) {
      return parsed
    }

    if (lines.length > 1) {
      parsed.translation = lines[lines.length - 1]
    }

    if (lines.length === 2) {
      return parsed
    }

    parsed.chunks = lines.slice(1,lines.length - 1).join(' ').split(/ +\/ +/).map((l) => {
      const p = l.match(/(.+?[\u3131-\uD79D ]*)(.*)/)
      if (!p) {
        throw new Error(`Could not match phrase: "${l}"`)
      }
      return ({
        source: p[1].trim(),
        translation: p[2].trim()
      })
    })

    return parsed
  }
}
