// import { ErrorData } from '@utils/interfaces/error/error-data.interface';

// const Sentry = require('@sentry/node');

// export class SentryHelper {
//   static logSentryError(error: any, job: any) {
//     Sentry.init({
//       dsn: process.env.SENTRY_DSN,
//       tracesSampleRate: 1.0,
//     });
//     let message: any = error.message;
//     error.statusCode = error.statusCode || 500;
//     if (error.statusCode >= 500) {
//       message = 'Server Error, Please contact tech team';
//     }
//     const errData: ErrorData = {
//       status: error.status,
//       error: error,
//       message: message,
//       stack: error.stack,
//       info: job.data,
//     };
//     Sentry.captureException(errData);
//   }
// }
