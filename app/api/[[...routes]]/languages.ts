type LanguageInfo = {
  flag: string;
  name: string;
};

type LanguageData = {
  [key: string]: LanguageInfo;
};

export const languageData: LanguageData = {
    'EN': { flag: '🇺🇸', name: 'English' },
    'ES': { flag: '🇪🇸', name: 'Spanish' }, 
    'FR': { flag: '🇫🇷', name: 'French' },
    'JP': { flag: '🇯🇵', name: 'Japanese' },
    'DE': { flag: '🇩🇪', name: 'German' },
    'KR': { flag: '🇰🇷', name: 'Korean' },
    'HI': { flag: '🇮🇳', name: 'Hindi' },
    'IT': { flag: '🇮🇹', name: 'Italian' },
    'CN': { flag: '🇨🇳', name: 'Chinese' },
    'RU': { flag: '🇷🇺', name: 'Russian' },
    'AR': { flag: '🇸🇦', name: 'Arabic' },
    'PT': { flag: '🇵🇹', name: 'Portuguese' },
    'TR': { flag: '🇹🇷', name: 'Turkish' },
    'NL': { flag: '🇳🇱', name: 'Dutch' },
    'VN': { flag: '🇻🇳', name: 'Vietnamese' },
    'UA': { flag: '🇺🇦', name: 'Ukrainian' },
    'GR': { flag: '🇬🇷', name: 'Greek' },
    'PL': { flag: '🇵🇱', name: 'Polish' },
    'SE': { flag: '🇸🇪', name: 'Swedish' },
    'LA': { flag: '🏛️',  name: 'Latin' },
    'IE': { flag: '🇮🇪', name: 'Irish' },
    'NO': { flag: '🇳🇴', name: 'Norwegian' },
    'IL': { flag: '🇮🇱', name: 'Hebrew' },
    'HV': { flag: '🐉',   name: 'High Valyrian' },
    'ID': { flag: '🇮🇩', name: 'Indonesian' },
    'DK': { flag: '🇩🇰', name: 'Danish' },
    'FI': { flag: '🇫🇮', name: 'Finnish' },
    'RO': { flag: '🇷🇴', name: 'Romanian' },
    'HW': { flag: '🌺',   name: 'Hawaiian' },
    'CZ': { flag: '🇨🇿', name: 'Czech' },
    'CY': { flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', name: 'Welsh' },
    'HT': { flag: '🇭🇹', name: 'Haitian Creole' },
    'SW': { flag: '🇹🇿', name: 'Swahili' },
    'GD': { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', name: 'Scottish Gaelic' },
    'HU': { flag: '🇭🇺', name: 'Hungarian' },
    'EO': { flag: '🌍',   name: 'Esperanto' },
    'KL': { flag: '🖖',   name: 'Klingon' },
    'ZU': { flag: '🇿🇦', name: 'Zulu' },
    'NV': { flag: '🏜️', name: 'Navajo' },
    'YI': { flag: '🇮🇱', name: 'Yiddish' }
  }