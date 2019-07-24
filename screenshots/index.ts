import puppeteer from 'puppeteer'

(async() => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36' })

  const cases = [
        { type: 'vue', url: '/packages/vue/demo' },
        { type: 'react', url: '/packages/react/demo' }
  ]

  for (const { type, url } of cases) {
    await page.goto(`http://localhost:8000${url}`)
    await page.waitFor(500)
    await page.screenshot({ path: `screenshots/${type}-initial.png` })

    await page.waitFor(3000)
    await page.screenshot({ path: `screenshots/${type}-3s.png` })

    await page.waitFor(3000)
    await page.screenshot({ path: `screenshots/${type}-6s.png` })

    const right = await page.$('.right')
    if (right) {
      await right.hover()
    }
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-right-hover.png` })

    if (right) {
      await right.click()
    }
    await page.waitFor(500)
    await page.screenshot({ path: `screenshots/${type}-right-click.png` })

    const left = await page.$('.left')
    if (left) {
      await left.hover()
    }
    await page.waitFor(100)
    await page.screenshot({ path: `screenshots/${type}-left-hover.png` })

    if (left) {
      await left.click()
    }
    await page.waitFor(500)
    await page.screenshot({ path: `screenshots/${type}-left-click.png` })
  }

  await browser.close()
})()
