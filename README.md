# ⏱️ 網頁自動刷新器 (Auto Refresh)

[![GitHub License](https://img.shields.io/github/license/Yuno-Liu/AutoRefresh)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![esbuild](https://img.shields.io/badge/Bundled%20with-esbuild-FFCF00?logo=esbuild&logoColor=black)](https://esbuild.github.io/)

一個現代、輕量且高效的 Chrome 擴充套件，允許使用者針對當前分頁自訂秒數自動重新整理網頁，並提供即時倒數計時、網頁懸浮小工具與防快取重新整理等豐富功能。

---

## ✨ 核心特色與功能

1. **⏱️ 高度自訂刷新頻率**
   - 支援精確到秒的自訂間隔（從 1 秒至數萬秒皆可）。
   - 支援 `+1`、`+5`、`-1`、`-5` 秒快捷微調按鈕。
   - 提供常用預設膠囊按鈕：`5秒`、`10秒`、`30秒`、`1分鐘`、`5分鐘`、`10分鐘`，一鍵切換。

2. **📑 分頁獨立運作（Tab-Isolated）**
   - 每個瀏覽器分頁皆具備完全獨立的計時器與設定狀態。
   - A 分頁設定 10 秒刷新，B 分頁設定 60 秒刷新，彼此互不影響。
   - 分頁關閉時自動清理計時器與暫存，不佔用系統資源。

3. **📊 即時倒數與動態進度**
   - 彈跳視窗（Popup）內建大字體即時倒數顯示與平滑動態進度條。
   - 即時統計：顯示當前分頁「累計刷新次數」與「上次刷新時間」。

4. **📌 網頁懸浮倒數小工具（Floating Widget）**
   - 在網頁右上角注入極簡、毛玻璃質感（Glassmorphism）的懸浮膠囊。
   - 採用 **Shadow DOM** 技術，樣式完全隔離，絕不影響或受制於原網頁樣式。
   - **支援自由拖曳**：可拖動至螢幕任意位置，並自動記住拖曳位置。
   - 顯示即時秒數與累計次數，並附帶一鍵停止按鈕。
   - 可在設定中自由開啟或關閉。

5. **🏷️ 工具列圖示即時 Badge 顯示**
   - 擴充套件圖示即時顯示剩餘倒數秒數（例如 `8s`、`3s`），綠色背景醒目提示。
   - 無需打開彈跳視窗，隨時掌握目前分頁是否正在自動刷新。

6. **⚙️ 實用進階選項**
   - **強制重新整理（略過快取）**：開啟後每次刷新直接向伺服器請求最新資源，避免讀取到舊的瀏覽器 Cache。
   - **隨機浮動秒數（Jitter）**：支援設定 `±N` 秒的隨機波動，避免固定規律請求，降低被網站伺服器識別為機器人或限速的風險。
   - **一鍵立即重新整理**：無需等待計時結束，點擊即可立即觸發一次重新整理。

---

## 🚀 安裝說明

### 載入未封裝項目（開發者模式）

1. 開啟 Chrome 瀏覽器，在網址列輸入 `chrome://extensions/` 並按 Enter。
2. 開啟右上角的「**開發人員模式**」（Developer mode）。
3. 點擊左上角的「**載入未封裝項目**」（Load unpacked）。
4. 選擇本專案編譯後的目錄：`dist` 資料夾。
5. 安裝完成後，即可在 Chrome 工具列看見「網頁自動刷新器」圖示，建議點擊圖釘圖示將其固定在工具列以便隨時操作。

---

## 🛠️ 開發與編譯指南

本擴充套件採用 **TypeScript** 與 **esbuild** 構建，輕量且極速。

### 常用指令

1. 複製專案與安裝相依套件：
   ```bash
   git clone https://github.com/Yuno-Liu/AutoRefresh.git
   cd AutoRefresh
   npm install
   ```

2. 編譯生產版本（產出至 `dist/` 資料夾）：
   ```bash
   npm run build
   ```

3. 開發監聽模式（程式碼變更時自動即時打包）：
   ```bash
   npm run watch
   ```

4. TypeScript 語法與型別檢查：
   ```bash
   npm run typecheck
   ```

5. 清除編譯產物：
   ```bash
   npm run clean
   ```

---

## 📂 目錄結構

```
AutoRefresh/
├── dist/                     # 編譯輸出目錄（載入此資料夾至 Chrome）
│   ├── background.js
│   ├── content.js
│   ├── popup.js
│   ├── popup.html
│   └── manifest.json
├── src/                      # TypeScript 原始碼
│   ├── background.ts         # 背景 Service Worker（計時與 Tab 管理）
│   ├── content.ts            # Content Script（注入懸浮倒數 Widget）
│   ├── popup.ts              # 彈跳視窗操作與互動邏輯
│   └── types.ts              # 共享介面與常數定義
├── manifest.json             # Manifest V3 配置
├── popup.html                # 彈跳視窗 HTML
├── package.json              # 專案相依性與指令
├── tsconfig.json             # TypeScript 編譯配置
├── LICENSE                   # MIT 授權條款
└── README.md                 # 專案文件
```

---

## 📜 授權協議 (License)

本專案採用 [MIT License](LICENSE) 授權。

