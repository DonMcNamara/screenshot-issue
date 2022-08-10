import { test, Page } from "@playwright/test";

// I am using some data URLs here with simple HTML pages, but any URL would work.
const simpleHtmlDataUrl =
  "data:text/html,<html><body><h1>Test page</h1></body></html>";

test("Take a bunch of screenshots", async ({ context }) => {
  const page1 = await context.newPage();
  page1.goto(simpleHtmlDataUrl);

  const page2 = await context.newPage();
  await page2.goto(simpleHtmlDataUrl);

  // At this point page 1 is in the background, page 2 is in the foreground.

  // Loop 10 time and take screenshots.
  // This is a contrived example that illustrates the issue.
  for (let i = 0; i < 10; i++) {
    console.log(`Loop ${i + 1}`);

    {
      // foreground tab screenshots run quickly
      const time = await timeScreenshot(page2);
      console.log(`Foreground tab screenshot took: ${time}ms`);
    }

    {
      // background tab screenshots run slowly and eventually time out
      const time = await timeScreenshot(page1);
      console.log(`Background tab screenshot took: ${time}ms`);
    }
  }
});

async function timeScreenshot(page: Page): Promise<number> {
  const start = Date.now();
  await page.screenshot({ timeout: 30_000 });
  return Date.now() - start;
}
