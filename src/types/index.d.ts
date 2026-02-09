export interface TranslationConfig {
    apiEndpoint: string;
    apiKey: string;
    model: string;
    targetLanguage: string;
    systemPrompt: string;
    autoTranslate: boolean;
}

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export interface TranslationChunk {
    content: string;
    done: boolean;
}

export interface CachedTranslation {
    content: string;
    timestamp: number;
    sourceUri: string;
    targetLanguage: string;
}

/**
 * 状态更新消息
 */
export interface StatusMessage {
  type: 'status';
  status: 'config_checking' | 'cache_checking' | 'api_connecting' | 'translating' | 'completing' | 'aborted';
}

/**
 * 进度更新消息
 */
export interface ProgressMessage {
  type: 'progress';
  progress: number;
  status: string;
}
