import React, { useState, useEffect, useRef } from 'react';
import { Streamdown } from 'streamdown';
import { code } from '@streamdown/code';
import { cjk } from '@streamdown/cjk';
import { mermaid } from '@streamdown/mermaid';
interface TranslationViewProps {
    vscode: any;
}

export const TranslationView: React.FC<TranslationViewProps> = ({ vscode }) => {
    console.log('[React] TranslationView component rendering!');
    const [content, setContent] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState({ status: '', loaded: 0, total: 0 });
    const [isInitializing, setIsInitializing] = useState(true); // 添加初始化状态
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('[React] TranslationView mounted, vscode available:', !!vscode);
        // 通知扩展 webview 已准备好
        vscode.postMessage({ type: 'ready' });
        console.log('[React] Sent ready message to extension');

        // 监听来自扩展的消息
        const handleMessage = (event: MessageEvent) => {
            console.log('[React] Received message:', event.data);
            const message = event.data;

            switch (message.type) {
                case 'start':
                    console.log('[React] Handling start');
                    handleStart();
                    break;
                case 'chunk':
                    console.log('[React] Handling chunk:', message.content.substring(0, 30) + '...');
                    handleChunk(message.content);
                    break;
                case 'complete':
                    console.log('[React] Handling complete');
                    handleComplete();
                    break;
                case 'error':
                    console.log('[React] Handling error:', message.error);
                    handleError(message.error);
                    break;
                case 'progress':
                    console.log('[React] Handling progress:', message);
                    handleProgress(message.status, message.progress);
                    break;
                case 'status':
                    console.log('[React] Handling status:', message.status);
                    setCurrentStatus(message.status);
                    break;
            }
        };

        console.log('[React] Setting up message listener');
        window.addEventListener('message', handleMessage);
        return () => {
            console.log('[React] Cleaning up message listener');
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleStart = () => {
        setContent('');
        setIsStreaming(true);
        setIsInitializing(false); // 结束初始化状态
        setError(null);
    };

    const handleChunk = (chunk: string) => {
        setContent(prev => prev + chunk);
    };

    const handleComplete = () => {
        setIsStreaming(false);
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
        setIsStreaming(false);
    };

    const handleProgress = (status: string, progressPercent: number) => {
        setProgress({ status, loaded: progressPercent, total: 100 });
    };

    const handleRetry = () => {
        vscode.postMessage({ type: 'retry' });
    };

    const handleOpenSettings = () => {
        vscode.postMessage({ type: 'openSettings' });
    };

    const handleClear = () => {
        setContent('');
        setError(null);
        setIsStreaming(false);
    };

    const formatBytes = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getPercentage = (): number => {
        if (progress.total === 0) return 0;
        return Math.round((progress.loaded / progress.total) * 100);
    };

    return (
        <div style={styles.container}>
            {/* 进度条 */}
            <div style={styles.progressBar}>
                <span style={styles.icon}>
                    {error ? '❌' :
                     currentStatus === 'config_checking' ? '🔍' :
                     currentStatus === 'cache_checking' ? '💾' :
                     currentStatus === 'api_connecting' ? '🌐' :
                     currentStatus === 'translating' ? '✍️' :
                     currentStatus === 'completing' ? '💾' :
                     currentStatus === 'aborted' ? '⏹️' :
                     isInitializing ? '⏳' :
                     isStreaming ? '✍️' :
                     content ? '✅' : '⏳'}
                </span>
                <span style={styles.progressText}>
                    {error ? 'Translation failed' :
                     currentStatus === 'config_checking' ? '验证配置中...' :
                     currentStatus === 'cache_checking' ? '检查缓存中...' :
                     currentStatus === 'api_connecting' ? '连接 AI 服务中...' :
                     currentStatus === 'translating' ? `翻译中... ${getPercentage()}%` :
                     currentStatus === 'completing' ? '完成并缓存中...' :
                     currentStatus === 'aborted' ? '已中止' :
                     isInitializing ? 'Preparing translation...' :
                     isStreaming ? `${progress.status || 'Translating...'} ${getPercentage()}% (${formatBytes(progress.loaded)}/${formatBytes(progress.total)})` :
                     content ? 'Translation complete' : 'Ready'}
                </span>
            </div>

            {/* 工具栏 */}
            <div style={styles.toolbar}>
                <button
                    onClick={handleRetry}
                    disabled={!error}
                    style={{
                        ...styles.button,
                        ...(error ? {} : styles.hidden)
                    }}
                >
                    🔄 Retry
                </button>
                <button onClick={handleOpenSettings} style={styles.button}>
                    ⚙️ Settings
                </button>
                <button onClick={handleClear} style={styles.button}>
                    🗑️ Clear
                </button>
            </div>

            {/* 错误提示 */}
            {error && (
                <div style={styles.errorBanner}>
                    <span>{error}</span>
                    <button onClick={handleRetry} style={styles.button}>Retry</button>
                </div>
            )}

            {/* 内容区域 */}
            <div
                ref={contentRef}
                style={styles.content}
            >
                {content ? (
                    <Streamdown
                        isAnimating={isStreaming}
                        plugins={{ code, cjk, mermaid }}
                        shikiTheme={['github-light', 'github-dark']}
                        mermaid={{ config: { theme: 'neutral' } }}
                    >
                        {content}
                    </Streamdown>
                ) : isInitializing ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'var(--vscode-descriptionForeground)',
                        gap: '16px'
                    }}>
                        <div style={{ fontSize: '48px' }}>⏳</div>
                        <p style={{ margin: 0, fontSize: '16px' }}>Preparing translation...</p>
                        <p style={{ margin: 0, fontSize: '13px', opacity: 0.7 }}>
                            Connecting to translation service
                        </p>
                    </div>
                ) : (
                    <p style={{ color: 'var(--vscode-descriptionForeground)' }}>
                        Select a Markdown file and click "Translate with AI" to start.
                    </p>
                )}
            </div>
        </div>
    );
};

// 样式
const styles = {
    container: {
        fontFamily: 'var(--vscode-font-family)',
        fontSize: 'var(--vscode-font-size)',
        color: 'var(--vscode-foreground)',
        backgroundColor: 'var(--vscode-editor-background)',
        margin: 0,
        padding: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    progressBar: {
        backgroundColor: 'var(--vscode-editor-background)',
        borderBottom: '1px solid var(--vscode-widget-border)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    icon: {
        fontSize: '16px',
    },
    progressText: {
        flex: 1,
        fontSize: '13px',
    },
    toolbar: {
        backgroundColor: 'var(--vscode-editor-background)',
        borderBottom: '1px solid var(--vscode-widget-border)',
        padding: '8px 16px',
        display: 'flex',
        gap: '8px',
    },
    button: {
        backgroundColor: 'var(--vscode-button-background)',
        color: 'var(--vscode-button-foreground)',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '13px',
        borderRadius: '2px',
    } as React.CSSProperties,
    hidden: {
        opacity: 0.5,
        cursor: 'not-allowed',
        display: 'none',
    },
    errorBanner: {
        backgroundColor: 'var(--vscode-errorBackground)',
        color: 'var(--vscode-errorForeground)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    content: {
        flex: 1,
        padding: '20px',
        lineHeight: '1.6',
        maxWidth: '900px',
        overflowY: 'auto' as const,
    },
};
