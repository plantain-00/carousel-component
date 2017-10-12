import * as puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36" });

    for (const type of ["vue", "react"]) {
        await page.goto(`http://localhost:8000/demo/${type}`);
        await page.waitFor(500);
        await page.screenshot({ path: `screenshots/${type}-initial.png`, fullPage: true });

        await page.waitFor(3000);
        await page.screenshot({ path: `screenshots/${type}-3s.png`, fullPage: true });

        await page.waitFor(3000);
        await page.screenshot({ path: `screenshots/${type}-6s.png`, fullPage: true });

        const right = await page.$(".right");
        await right.hover();
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-right-hover.png`, fullPage: true });

        await right.click();
        await page.waitFor(500);
        await page.screenshot({ path: `screenshots/${type}-right-click.png`, fullPage: true });

        const left = await page.$(".left");
        await left.hover();
        await page.waitFor(100);
        await page.screenshot({ path: `screenshots/${type}-left-hover.png`, fullPage: true });

        await left.click();
        await page.waitFor(500);
        await page.screenshot({ path: `screenshots/${type}-left-click.png`, fullPage: true });
    }

    browser.close();
})();
