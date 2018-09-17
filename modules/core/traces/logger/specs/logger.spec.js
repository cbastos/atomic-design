import { Logger, LogLevel } from '../logger';

describe('The default logger', () => {
    let the_default_logger;

    beforeEach(() => {
        the_default_logger = new Logger();
    });

    it('should have error log level as default', () => {
        expect(the_default_logger.logLevel).toBe(LogLevel.error);
    });

    it('can change the log level', () => {
        const an_irrelevant_log_level = LogLevel.error;

        the_default_logger.setLoggingLevel(an_irrelevant_log_level);

        expect(the_default_logger.logLevel).toBe(an_irrelevant_log_level);
    });

    it('can configure a logs handler', () => {
        const LOG_MESSAGE = 'some irrelevant log';
        let managed_log_message;
        const a_logs_handler = {
            logLevels: [LogLevel.info],
            manageLog: (log) => {
                managed_log_message = log.name;
            }
        };

        the_default_logger.addLogsHandler(a_logs_handler);
        the_default_logger.info({ name: LOG_MESSAGE });
        expect(managed_log_message).toBe(LOG_MESSAGE);
    });
});
