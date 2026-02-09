import remend from 'remend';

/**
 * 使用 remend 完成不完整的 Markdown 语法
 */
export function completeMarkdown(text: string): string {
    return remend(text, {
        bold: true,
        italic: true,
        links: true,
        inlineCode: true,
        katex: false, // 不需要数学公式
        linkMode: 'protocol', // 使用协议模式处理不完整链接
    });
}

/**
 * 增量 Markdown 渲染器
 * 结合 remend 和自定义渲染逻辑
 */
export class IncrementalMarkdownRenderer {
    private fullContent = '';

    /**
     * 追加新的 Markdown 内容并渲染
     */
    append(chunk: string): string {
        this.fullContent += chunk;

        // 使用 remend 完成不完整的语法
        const completed = completeMarkdown(this.fullContent);

        // 渲染为 HTML
        return this.renderMarkdown(completed);
    }

    /**
     * 重置渲染器
     */
    reset(): void {
        this.fullContent = '';
    }

    /**
     * 渲染 Markdown 为 HTML
     */
    private renderMarkdown(text: string): string {
        let html = text;

        // HTML 转义（安全性）
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // 代码块（必须先处理）
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

        // 水平线（必须在粗体斜体之前）
        html = html.replace(/^---$/gm, '<hr>');
        html = html.replace(/^\*\*\*$/gm, '<hr>');

        // 标题
        html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // 粗体和斜体
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 删除线
        html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

        // 行内代码
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // 链接
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // 无序列表
        html = html.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

        // 有序列表
        html = html.replace(/^\d+\. (.+)$/gm, '<oli>$1</oli>');
        html = html.replace(/(<oli>.*<\/oli>\n?)+/g, (match) => {
            let counter = 1;
            return '<ol>' + match.replace(/<oli>(.*?)<\/oli>/g, (_, content) => `<li>${counter++} ${content}</li>`) + '</ol>';
        });

        // 引用块
        html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

        // 段落和换行
        html = html.replace(/\n\n+/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');

        // 包装在段落中
        if (!html.startsWith('<')) {
            html = '<p>' + html + '</p>';
        }

        return html;
    }
}

// 导出为全局变量
(window as any).IncrementalMarkdownRenderer = IncrementalMarkdownRenderer;
(window as any).completeMarkdown = completeMarkdown;
