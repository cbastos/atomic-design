import { Logger } from './traces/logger/logger';
import { SessionStorage } from './storage/sessionStorage/sessionStorage';
import { LocalStorage } from './storage/localStorage/localStorage';
import { AuthorizationChecker } from './authorization/authorizationChecker';
import { CurrentCulture, Translator, CurrentDateFormatter } from './localization';

export { LogLevel } from './traces/logger/logger';
export { ErrorBoundary } from './exceptions/ErrorBoundary';

export const logger = new Logger();
export const sessionStorage = new SessionStorage();
export const localStorage = new LocalStorage();
export const authorizationChecker = new AuthorizationChecker();
export const currentCulture = new CurrentCulture();
export const currentDateFormatter = new CurrentDateFormatter(currentCulture);

const translator = new Translator(currentCulture);
export const translate = translator.translate.bind(translator);

