import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback?: string): string | undefined {
  const value = process.env[key];
  return value && value.trim() !== '' ? value : fallback;
}

const config = {
  port: parseInt(optionalEnv('PORT', '3000')!, 10),
  nodeEnv: optionalEnv('NODE_ENV', 'development')!,

  db: {
    url: requireEnv('DB_URL'),
    pass: requireEnv('DB_PASS'),
  },

  track: {
    defaultThumbnail: optionalEnv('TRACK_DEFAULT_THUMBNAIL', 'tracks/default.png')!,
  },

  jwt: {
    secret: requireEnv('JWT_SECRET'),
    issuer: requireEnv('JWT_ISSUER'),
    audience: requireEnv('JWT_AUDIENCE'),
  },

  oauth: {
    google: {
      clientId: requireEnv('OAUTH20_GOOGLE_CLIENT'),
      secret: requireEnv('OAUTH20_GOOGLE_SECRET'),
    },
  },
};

export default config;
