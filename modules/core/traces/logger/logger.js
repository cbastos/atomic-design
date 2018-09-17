/**
 * The logger provides methods for different types
 * of logging. Can be configured with log level for
 * show o or not logs in console. And has a list
 * of logs handlers that manages logs actions.
 */
export class Logger {
    constructor() {
        this.logsHandlers = [];
        this.logLevel = LogLevel.error;
    }

    /**
     * Configures the logging level.
     */
    setLoggingLevel(logLevel) {
        this.logLevel = logLevel;
    }

    /**
     * Adds a logs handler.
     */
    addLogsHandler(logsHandler) {
        this.logsHandlers.push(logsHandler);
    }

    /**
     * Logs an error
     * @param log a log.
     */
    error(log) {
        this.manageLogByLevelName(log, 'error');
    }

    /**
     * Logs a warning
     * @param log a log.
     */
    warn(log) {
        this.manageLogByLevelName(log, 'warn');
    }

    /**
     * Logs a info message
     * @param log a log.
     */
    info(log) {
        this.manageLogByLevelName(log, 'info');
    }

    /**
     * Logs a debug log
     * @param log a log.
     */
    debug(log) {
        this.manageLogByLevelName(log, 'debug');
    }

    /**
     * Logs a trace
     * @param log a log.
     */
    trace(log) {
        this.manageLogByLevelName(log, 'trace');
    }

    manageLogByLevelName(log, logLevelName) {
        this.sendLogToApplyingLogsHandlers(LogLevel[logLevelName], log);
    }

    sendLogToApplyingLogsHandlers(logLevel, log) {
        this.logsHandlers.forEach((logsHandler) => {
            const handlerManagesThisLogLevel = logsHandler.logLevels.indexOf(logLevel) !== -1;
            if (handlerManagesThisLogLevel) {
                logsHandler.manageLog(log);
            }
        });
    }
}

/**
 * List of available log levels
 */
export const LogLevel = {
    info: 0,
    debug: 1,
    warn: 2,
    error: 3,
    trace: 4
};
