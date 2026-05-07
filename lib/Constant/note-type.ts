export const NOTE_TYPE = {
  COMPLAINT: 'complaint',
  INQUIRY: 'inquiry',
  SUGGESTION: 'suggestion',
  COMPLIMENT: 'compliment',
  FEEDBACK: 'feedback',
  OTHER: 'other'
} as const;

export type NOTE_TYPE_TYPE = (typeof NOTE_TYPE)[keyof typeof NOTE_TYPE];

export const NOTE_TYPE_NAMES: Record<NOTE_TYPE_TYPE, string> = {
  [NOTE_TYPE.COMPLAINT]: 'شكوى',
  [NOTE_TYPE.INQUIRY]: 'استفسار',
  [NOTE_TYPE.SUGGESTION]: 'اقتراح',
  [NOTE_TYPE.COMPLIMENT]: 'إطراء',
  [NOTE_TYPE.FEEDBACK]: 'ملاحظات',
  [NOTE_TYPE.OTHER]: 'أخرى'
};
