interface ErrorMetadata {
  [key: string]: unknown;
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public metadata?: ErrorMetadata,
  ) {
    super(message);
  }
}

export const handleError = (error: unknown) => {
  console.error(error);
};
