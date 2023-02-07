export default class AppError extends Error {
  statusCode: number;
  status: string;
  level: ErrorLevel;
  constructor(statusCode: number, status: string, message: any, level = ErrorLevel.Normal) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.level = level;
  }

  toJson() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

enum ErrorLevel {
  Normal,
  Critical,
  Warn,
}
