import test from "node:test";
import assert from "node:assert/strict";
import { computeNextInterval, formatTime, formatSecondsToTime, validateInterval } from "../dist-test/utils/timer.js";

test("Timer Utility - computeNextInterval", async (t) => {
    await t.test("當 jitter <= 0 時應回傳基礎秒數", () => {
        assert.equal(computeNextInterval(10, 0), 10);
        assert.equal(computeNextInterval(5, -2), 5);
    });

    await t.test("當 jitter > 0 時秒數應在 [base - jitter, base + jitter] 範圍內", () => {
        const base = 20;
        const jitter = 5;
        for (let i = 0; i < 50; i++) {
            const next = computeNextInterval(base, jitter);
            assert.ok(next >= base - jitter, `next (${next}) should be >= ${base - jitter}`);
            assert.ok(next <= base + jitter, `next (${next}) should be <= ${base + jitter}`);
        }
    });

    await t.test("計算結果最少應限制為 1 秒 (不應產生 <= 0 秒數)", () => {
        // 模擬隨機數產生最大負偏移
        const next = computeNextInterval(2, 5, () => 0);
        assert.equal(next, 1);
    });
});

test("Timer Utility - formatSecondsToTime", async (t) => {
    await t.test("小於 60 秒格式化為 Xs", () => {
        assert.equal(formatSecondsToTime(5), "5s");
        assert.equal(formatSecondsToTime(59), "59s");
        assert.equal(formatSecondsToTime(0), "0s");
    });

    await t.test("大於等於 60 秒且小於 1 小時格式化為 MM:SS", () => {
        assert.equal(formatSecondsToTime(60), "01:00");
        assert.equal(formatSecondsToTime(90), "01:30");
        assert.equal(formatSecondsToTime(3599), "59:59");
    });

    await t.test("大於等於 1 小時格式化為 HH:MM:SS", () => {
        assert.equal(formatSecondsToTime(3600), "01:00:00");
        assert.equal(formatSecondsToTime(3665), "01:01:05");
    });
});

test("Timer Utility - validateInterval", async (t) => {
    await t.test("合法整數秒數應原樣回傳", () => {
        assert.equal(validateInterval(30), 30);
    });

    await t.test("小於最小值時自動修正為最小值", () => {
        assert.equal(validateInterval(0), 1);
        assert.equal(validateInterval(-10), 1);
    });

    await t.test("NaN 自動修正為預設最小值", () => {
        assert.equal(validateInterval(NaN), 1);
    });

    await t.test("超過上限時自動限制為最大值", () => {
        assert.equal(validateInterval(100000, 1, 86400), 86400);
    });
});
