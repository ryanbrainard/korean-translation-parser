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

    parsed.chunks = lines[1].split(/ +\/ +/).map((l) => {
      const p = l.match(/(.+?[\u3131-\uD79D ]*)(.*)/)
      if (!p) {
        throw `Could not match phrase: "${l}"`
      }
      return ({
        source: p[1].trim(),
        translation: p[2].trim()
      })
    })

    if (lines.length > 2) {
      parsed.translation = lines[2]
    }

    if (lines.length > 3) {
      throw 'No more than 3 lines'
    }

    return parsed
  }
}
