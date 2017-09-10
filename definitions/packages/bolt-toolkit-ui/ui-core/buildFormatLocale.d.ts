export declare type LocaleType = {
    months3char?: string[];
    monthsFull?: string[];
    weekdays2char?: string[];
    weekdays3char?: string[];
    weekdaysFull?: string[];
    meridiemUppercase?: string[];
    meridiemLowercase?: string[];
    meridiemFull?: string[];
    todayButtonText?: string;
};
export declare function buildFormatLocale(customLocale?: LocaleType): {
    formatters: {
        'MMM': (date: Date) => string;
        'MMMM': (date: Date) => string;
        'dd': (date: Date) => string;
        'ddd': (date: Date) => string;
        'dddd': (date: Date) => string;
        'A': (date: Date) => string;
        'a': (date: Date) => string;
        'aa': (date: Date) => string;
    } & Partial<{
        'Mo': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
        'Do': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
        'DDDo': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
        'do': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
        'Qo': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
        'Wo': (date: Date, formatters: {
            M: (date: Date) => number;
            D: (date: Date) => number;
            DDD: (date: Date) => number;
            d: (date: Date) => number;
            Q: (date: Date) => number;
            W: (date: Date) => number;
        }) => string;
    }>;
};
