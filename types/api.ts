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

export interface GetUserMessagesDto {
    page?: number;            
    pageSize?: number;        
    sortBy?: 'createdAt' | 'updatedAt' | 'validUntil';  
    sortDirection?: 'asc' | 'desc';  
    validUntilBefore?: string;       
    validUntilAfter?: string;        
}

export interface UserMessageResponseDto {
    uuid: string;
    validUntil: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedUserMessagesDto {
    items: UserMessageResponseDto[]; 
    totalCount: number;              
    page: number;                    
    pageSize: number;                
    totalPages: number;              
}