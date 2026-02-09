import React from 'react';
import ReactDOM from 'react-dom/client';
import { TranslationView } from './TranslationView';
import '../styles/globals.css';

// 获取 VSCode API
const vscode = (window as any).acquireVsCodeApi();

// 渲染 React 组件
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<TranslationView vscode={vscode} />);
