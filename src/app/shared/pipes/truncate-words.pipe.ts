import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
  standalone: true,
})
export class TruncateWordsPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    maxWords: number = 20,
    maxChars: number = 120   // extra safety for URLs / long text
  ): string {
    if (!value) return '';

    const trimmed = value.trim();

    // 1) If it's one long "word" (no spaces) – like a URL – cut by chars
    if (!/\s/.test(trimmed) && trimmed.length > maxChars) {
      return trimmed.substring(0, maxChars) + '...';
    }

    // 2) Normal case – limit by word count
    const words = trimmed.split(/\s+/);

    if (words.length <= maxWords && trimmed.length <= maxChars) {
      return trimmed;
    }

    let result = words.slice(0, maxWords).join(' ');

    // 3) If still too long, also cut by characters
    if (result.length > maxChars) {
      result = result.substring(0, maxChars);
      const lastSpace = result.lastIndexOf(' ');
      if (lastSpace > 0) {
        result = result.substring(0, lastSpace);
      }
    }

    return result + '...';
  }
}
