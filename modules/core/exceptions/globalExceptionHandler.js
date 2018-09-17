import { logger } from '../';

window.onerror = error => logger.error({ message: error });
