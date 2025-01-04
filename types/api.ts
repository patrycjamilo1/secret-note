export interface ValidationMessageObject {
    property: string;
    message: string;
}

export interface FetchErrorWithMessage {
    statusCode: number;
    statusMessage: string;
    data: {
        message?: ValidationMessageObject[] | string;
        error: string;
        statusCode: number;
    }
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}


export interface CreatedMessageResponse {
    uuid: string;
    validUntil?: string;
    userId?: number;
    createdAt: string;
    updatedAt: string;
    isPasswordProtected: boolean;
}

export interface MessageMetadata {
    uuid: string;
    isPasswordProtected: boolean;
    validUntil?: string;
}

export interface ReadMessageResponse {
    secretMessage: string;
    metadata: {
      uuid: string;
      validUntil?: string;
      userId?: number;
      createdAt: string;
      updatedAt: string;
      isPasswordProtected: boolean;
    };
}