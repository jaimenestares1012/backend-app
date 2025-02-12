import { createLogger, Logger, transports, format } from 'winston';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './logger.module-definition';

class LoggerJson {
  timestamp: string = new Date().toISOString();
  level: string;
  applicationId: string;
  subdomain: string;
  message: any;
  context?: any;

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
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          // Trata de parsear el mensaje JSON si es posible
          try {
            const parsedMessage = JSON.parse(message);
            return `${this.formatDate(timestamp)} [${level}] ${JSON.stringify(parsedMessage.message, null, 2)} ${parsedMessage.context ? JSON.stringify(parsedMessage.context, null, 2) : ''}`;
          } catch (error) {
            // Si el mensaje no es JSON, imprímelo como está
            return `${this.formatDate(timestamp)} [${level}] ${message}`;
          }
        }),
        format.errors({ stack: true }),
      ),
      transports: [new transports.Console()],
    });
  }

  private logBody(level: string, message: any, context?: any) {
    const applicationId = this.options.applicationId;
    const subdomain = this.options.domain;
    return {
      level,
      message: JSON.stringify(
        new LoggerJson({ message, level, context, applicationId, subdomain }),
      ),
      timestamp: this.formatDate(new Date().toISOString()),
    };
  }

  public log(message: any, context?: any): void {
    const level: string = 'info';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      const logBody = this.logBody(level, message, context);
      this.logger.log(logBody.level, logBody.message);
    }
  }

  public debug(message: any, context?: any): void {
    const level: string = 'debug';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      const logBody = this.logBody(level, message, context);
      this.logger.debug(logBody.message);
    }
  }

  public warning(message: any, context?: any): void {
    const level: string = 'warn';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      const logBody = this.logBody(level, message, context);
      this.logger.warn(logBody.message);
    }
  }

  public error(message: any, context?: any): void {
    const level: string = 'error';
    const canActivate = this.options.levels?.some(
      (acLevel) => acLevel === level.toUpperCase(),
    );
    if (canActivate) {
      const logBody = this.logBody(level, message, context);
      this.logger.error(logBody.message);
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

  private formatDate(date: string): string {
    const newDate = new Date(date);
    return newDate.toLocaleString('es-PE', { timeZone: 'America/Lima' });
  }
}
