declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: string;
      PORT?: string;
      PWD: string;
      DB_NIYOWEB: string;
      DB_POS: string;
      DB_PASS: string;
      DB_USER: string;
      DB_HOST: string;

      SERVER_URL: string;
      REDIS_URL: string;

      DB_CONNECTION: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;

      RATE_WINDOW_SIZE: number;
      RATE_LIMIT_MAX: number;

      TEST_MAIL_USERNAME: string;
      TEST_MAIL_PASSWORD: string;
      TEST_MAIL_SERVICE: string;
      TEST_MAIL_FROM_ADDRESS: string;

      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
      MAIL_FROM_ADDRESS: string;
      MAIL_HOST: string;
      MAIL_PORT: integer;
      MAIL_SECURE: boolean;
      MAIL_REQUIRE_TLS: boolean;

      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      SWAGGER_PASSWORD: string;

      MONGO_DB_URL: string;

      KARIX_SMS_KEY: string;
      KARIX_SMS_URL: string;

      KARIX_WHATSAPP_KEY: string;
      KARIX_WHATSAPP_URL: string;

      ONESIGNAL_APP_ID: string;
      ONESIGNAL_API_KEY: string;

      AUTHENTICATION_LEVEL: number;

      AWS_SECRET_KEY: string;
      AWS_ACCESS_KEY: string;
      AWS_REGION: string;
      RABBITMQ_URL: string;
    }
  }
}

export {};
