import puppeteer from "puppeteer";

// TEST WITH http://localhost:3000/api/pdf

export async function GET(req: Request) {
  const baseUrl = new URL(req.url).origin;

  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(`${baseUrl}/Print?print=true`, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-2.pdf`
    }
  });
}
