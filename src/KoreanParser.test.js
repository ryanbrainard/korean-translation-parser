import {KoreanParser} from './KoreanParser'

it('parses', () => {
  const input = `
    "우와~ 이거 / 들리네!",
    우와 Wow / 이거 this thing / 들리다 to be heard (with foreign language, it can mean ‘to pick up on or understand through listening’)
    “Wow! I can understand this!”
  `

  expect(KoreanParser.parse(input)).toEqual({
    source: "\"우와~ 이거 / 들리네!\",",
    phrases: [
      {
        transcription: "우와",
        translation: "Wow",
      },
      {
        transcription: "이거",
        translation: "this thing",
      },
      {
        transcription: "들리다",
        translation: "to be heard (with foreign language, it can mean ‘to pick up on or understand through listening’)",
      },
    ],
    translation: "“Wow! I can understand this!”"
  });
});
