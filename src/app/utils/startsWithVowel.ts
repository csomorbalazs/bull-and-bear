export function startsWithVowel(text: string) {
  return (/^[aáeéiíoóöőuúüű]$/i).test(text[0]);
}