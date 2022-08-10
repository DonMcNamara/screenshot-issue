# Screenshot timing issues with CDP

This repo demonstrates an issue around screenshot timing when using CDP on
background tabs in headful mode.

When executed as-is, the screenshots from the background tab will return slowly
and eventually time out. For example:

```
npx playwright test --project=chromium --headed

Running 1 test using 1 worker
[chromium] › example.spec.ts:7:1 › Take a bunch of screenshots
Loop 1
Foreground tab screenshot took: 174ms
Background tab screenshot took: 152ms
Loop 2
Foreground tab screenshot took: 142ms
Background tab screenshot took: 3607ms
Loop 3
Foreground tab screenshot took: 98ms
  1) [chromium] › example.spec.ts:7:1 › Take a bunch of screenshots ================================

    Test timeout of 30000ms exceeded.

    page.screenshot: Target closed
    =========================== logs ===========================
    taking page screenshot
    ============================================================

      34 | async function timeScreenshot(page: Page): Promise<number> {
      35 |   const start = Date.now();
    > 36 |   await page.screenshot({ timeout: 30_000 });
         |              ^
      37 |   return Date.now() - start;
      38 | }
      39 |
```

Interestingly, if you enable trace mode, the screenshots run quickly for the
foreground and background tabs.

```
npx playwright test --project=chromium --headed

Running 1 test using 1 worker
[chromium] › example.spec.ts:7:1 › Take a bunch of screenshots
Loop 1
Foreground tab screenshot took: 138ms
Background tab screenshot took: 168ms
Loop 2
Foreground tab screenshot took: 132ms
Background tab screenshot took: 110ms
Loop 3
Foreground tab screenshot took: 148ms
Background tab screenshot took: 155ms
Loop 4
Foreground tab screenshot took: 124ms
Background tab screenshot took: 155ms
Loop 5
Foreground tab screenshot took: 128ms
Background tab screenshot took: 159ms
Loop 6
Foreground tab screenshot took: 137ms
Background tab screenshot took: 146ms
Loop 7
Foreground tab screenshot took: 148ms
Background tab screenshot took: 118ms
Loop 8
Foreground tab screenshot took: 110ms
Background tab screenshot took: 133ms
Loop 9
Foreground tab screenshot took: 155ms
Background tab screenshot took: 150ms
Loop 10
Foreground tab screenshot took: 138ms
Background tab screenshot took: 131ms

  1 passed (4s)

```
