/**
 * ⏱️ 計時器與時間格式化工具函式
 */

/**
 * 計算下一次刷新的秒數（包含隨機抖動 Jitter）
 * @param baseInterval 基礎秒數
 * @param jitter 浮動範圍 (±N秒)
 * @param randomFn 可注入的隨機函式 (測試用)
 */
export function computeNextInterval(
    baseInterval: number,
    jitter: number,
    randomFn: () => number = Math.random
): number {
    const base = Math.max(1, Math.floor(baseInterval));
    if (jitter <= 0) return base;
    const offset = Math.floor(randomFn() * (jitter * 2 + 1)) - jitter;
    return Math.max(1, base + offset);
}

/**
 * 格式化毫秒為時間字串 HH:MM:SS
 */
export function formatTime(ms: number | null): string {
    if (!ms) return "--:--:--";
    const date = new Date(ms);
    return date.toLocaleTimeString("zh-TW", { hour12: false });
}

/**
 * 格式化秒數為倒數顯示字串 (例如 5s、01:30、01:05:20)
 */
export function formatSecondsToTime(seconds: number): string {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    const remS = s % 60;
    if (m === 0) {
        return `${remS}s`;
    }
    const remM = m % 60;
    const h = Math.floor(m / 60);
    if (h === 0) {
        return `${String(remM).padStart(2, "0")}:${String(remS).padStart(2, "0")}`;
    }
    return `${String(h).padStart(2, "0")}:${String(remM).padStart(2, "0")}:${String(remS).padStart(2, "0")}`;
}

/**
 * 驗證並限制間隔秒數
 */
export function validateInterval(val: number, minSec = 1, maxSec = 86400): number {
    if (isNaN(val) || val < minSec) return minSec;
    if (val > maxSec) return maxSec;
    return Math.floor(val);
}
