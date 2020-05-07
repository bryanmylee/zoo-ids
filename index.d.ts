declare module 'gfycat-ids' {
  enum CaseStyle {
    titlecase = 'titlecase',
    camelcase = 'camelcase',
    uppercase = 'uppercase',
    lowercase = 'lowercase',
    togglecase = 'togglecase',
  }
  type GeneratorOptions = {
    delimiter: string,
    caseStyle: CaseStyle,
  };
  export function generateId(seed?: any, adjectiveCount?: number, opts?: GeneratorOptions): string;
}
