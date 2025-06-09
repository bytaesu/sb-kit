const REGEX_SOURCES = {
  LETTER: '[a-zA-Z]',
  LOWERCASE: '[a-z]',
  UPPERCASE: '[A-Z]',
  NUMBER: '[0-9]',
  SYMBOL: '[^a-zA-Z0-9]',
};

export type PasswordRule =
  | 'no-requirement'
  | 'letters-digits'
  | 'lowercase-uppercase-letters-digits'
  | 'lowercase-uppercase-letters-digits-symbols';

export type PasswordPolicyEntry = {
  regexSource: string;
  message: string;
};

export type PasswordPolicy = PasswordPolicyEntry[];

export const passwordPolicy = ({
  minLength = 8,
  passwordRule,
}: {
  minLength: number;
  passwordRule: PasswordRule;
}): PasswordPolicy => {
  if (minLength < 6) {
    throw new Error('Password length must be at least 6 characters.');
  }

  const minLengthRule: PasswordPolicyEntry = {
    regexSource: `.{${minLength},}`,
    message: `Password must be at least ${minLength} characters long.`,
  };

  switch (passwordRule) {
    case 'letters-digits':
      return [
        minLengthRule,
        {
          regexSource: REGEX_SOURCES.LETTER,
          message: 'Password must contain at least one letter.',
        },
        {
          regexSource: REGEX_SOURCES.NUMBER,
          message: 'Password must contain at least one number.',
        },
      ];
    case 'lowercase-uppercase-letters-digits':
      return [
        minLengthRule,
        {
          regexSource: REGEX_SOURCES.LOWERCASE,
          message: 'Password must contain at least one lowercase letter.',
        },
        {
          regexSource: REGEX_SOURCES.UPPERCASE,
          message: 'Password must contain at least one uppercase letter.',
        },
        {
          regexSource: REGEX_SOURCES.NUMBER,
          message: 'Password must contain at least one number.',
        },
      ];
    case 'lowercase-uppercase-letters-digits-symbols':
      return [
        minLengthRule,
        {
          regexSource: REGEX_SOURCES.LOWERCASE,
          message: 'Password must contain at least one lowercase letter.',
        },
        {
          regexSource: REGEX_SOURCES.UPPERCASE,
          message: 'Password must contain at least one uppercase letter.',
        },
        {
          regexSource: REGEX_SOURCES.NUMBER,
          message: 'Password must contain at least one number.',
        },
        {
          regexSource: REGEX_SOURCES.SYMBOL,
          message: 'Password must contain at least one special character.',
        },
      ];
    case 'no-requirement':
      return [minLengthRule];
    default:
      throw new Error(`Unknown password rule: ${passwordRule}`);
  }
};
