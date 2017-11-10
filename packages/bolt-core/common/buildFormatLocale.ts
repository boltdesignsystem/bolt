export type LocaleType = {
  months3char?: string[],
  monthsFull?: string[],
  weekdays2char?: string[],
  weekdays3char?: string[],
  weekdaysFull?: string[],
  meridiemUppercase?: string[],
  meridiemLowercase?: string[],
  meridiemFull?: string[],
  todayButtonText?: string,
};

type FormatterFn = ( date: Date ) => string;
type Formatters = {
  // Month: Jan, Feb, ..., Dec
  'MMM': FormatterFn,
  // Month: January, February, ..., December
  'MMMM': FormatterFn,
  // Day of week: Su, Mo, ..., Sa
  'dd': FormatterFn,
  // Day of week: Sun, Mon, ..., Sat
  'ddd': FormatterFn,
  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': FormatterFn,
  // AM, PM
  'A': FormatterFn,
  // am, pm
  'a': FormatterFn,
  // a.m., p.m.
  'aa': FormatterFn,
};
type OrdinalFormatterFn = (
  date: Date,
  formatters: {[ P in OrdinalFormattersRawKeys ]: ( date: Date ) => number}
) => string;
type OrdinalFormattersRawKeys = 'M' | 'D' | 'DDD' | 'd' | 'Q' | 'W';
type OrdinalFormatters = {
  'Mo': OrdinalFormatterFn,
  'Do': OrdinalFormatterFn,
  'DDDo': OrdinalFormatterFn,
  'do': OrdinalFormatterFn,
  'Qo': OrdinalFormatterFn,
  'Wo': OrdinalFormatterFn,
};

const defaultLocale: LocaleType = {
  months3char: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  monthsFull: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  weekdays2char: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
  weekdays3char: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  meridiemUppercase: [ 'AM', 'PM' ],
  meridiemLowercase: [ 'am', 'pm' ],
  meridiemFull: [ 'a.m.', 'p.m.' ],
};

const MERIDIEM_TIME_PERIOD = 12;

export function buildFormatLocale( customLocale?: LocaleType ) {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.

  const mergedLocale: LocaleType = Object.assign( {}, defaultLocale, customLocale );

  const formatters: Formatters & Partial<OrdinalFormatters> = {
    // Month: Jan, Feb, ..., Dec
    'MMM': ( date: Date ) => mergedLocale.months3char[ date.getMonth() ],

    // Month: January, February, ..., December
    'MMMM': ( date: Date ) => mergedLocale.monthsFull[ date.getMonth() ],

    // Day of week: Su, Mo, ..., Sa
    'dd': ( date: Date ) => mergedLocale.weekdays2char[ date.getDay() ],

    // Day of week: Sun, Mon, ..., Sat
    'ddd': ( date: Date ) => mergedLocale.weekdays3char[ date.getDay() ],

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': ( date: Date ) => mergedLocale.weekdaysFull[ date.getDay() ],

    // AM, PM
    'A': ( date: Date ) => (
      ( date.getHours() / MERIDIEM_TIME_PERIOD ) >= 1
        ? mergedLocale.meridiemUppercase[ 1 ]
        : mergedLocale.meridiemUppercase[ 0 ]
    ),

    // am, pm
    'a': ( date: Date ) => (
      ( date.getHours() / MERIDIEM_TIME_PERIOD ) >= 1
        ? mergedLocale.meridiemLowercase[ 1 ]
        : mergedLocale.meridiemLowercase[ 0 ]
    ),

    // a.m., p.m.
    'aa': ( date: Date ) => (
      ( date.getHours() / MERIDIEM_TIME_PERIOD ) >= 1
        ? mergedLocale.meridiemFull[ 1 ]
        : mergedLocale.meridiemFull[ 0 ]
    )
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  const ordinalFormatters: OrdinalFormattersRawKeys[] = [ 'M', 'D', 'DDD', 'd', 'Q', 'W' ];
  ordinalFormatters.forEach( function( formatterToken ) {
    const ordinalFormatterToken = `${formatterToken}o` as keyof OrdinalFormatters;
    formatters[ ordinalFormatterToken ] = function( date, _formatters ) {
      return ordinal( _formatters[ formatterToken ]( date ) );
    };
  } );

  return { formatters };
}

function ordinal( num: number ): string {
  // tslint:disable:no-magic-numbers
  const rem100 = num % 100;
  if ( rem100 > 20 || rem100 < 10 ) {
    switch ( rem100 % 10 ) {
      case 1:
        return num + 'st';
      case 2:
        return num + 'nd';
      case 3:
        return num + 'rd';
    }
  }

  return num + 'th';
}
