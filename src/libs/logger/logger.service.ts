import { createLogger, Logger, transports, format } from 'winston';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './logger.module-definition';
class LoggerJson {
  timestamp: string = new Date().toISOString();
  level: string;
  applicationId: string;
  subdomain: string;
  message: string;
  context?: object;
  constructor(props: Partial<LoggerJson>) {
    Object.assign(this, props);
  }
}
@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions,
  ) {
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.errors({ stack: true }),
          ),
        }),
      ],
    });
  }
  private logBody(level: string, message: string, context?: object) {
    const applicationId = this.options.applicationId;
    const subdomain = this.options.domain;
    return {
      level,
      message: JSON.stringify(
        new LoggerJson({ message, level, context, applicationId, subdomain }),
      ),
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'America/Santiago',
      }),
    };
  }
  public log(message: string, context?: object): void {
    const level: string = 'info';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      this.logger.log(this.logBody(level, message, context));
    }
  }
  public debug(message: string, context?: object): void {
    const level: string = 'debug';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      this.logger.debug(this.logBody(level, message, context));
    }
  }
  public warning(message: string, context?: object): void {
    const level: string = 'warn';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      this.logger.warn(this.logBody(level, message, context));
    }
  }
  public error(message: string, context?: object): void {
    const level: string = 'error';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      this.logger.error(this.logBody(level, message, context));
    }
  }
  public printLog<T>(
    description: string,
    message: T,
    isError?: boolean,
    extraContext?: object,
  ): void {
    const bodyAsString: string =
      typeof message === 'string' ? message : JSON.stringify(message);
    this[isError ? 'error' : 'log'](
      `${description} : ${bodyAsString}`,
      (extraContext || message) as object,
    );
  }
}
