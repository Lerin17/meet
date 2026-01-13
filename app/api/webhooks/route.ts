import { NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET|| '';

console.log('Webhook secret loaded:', secret);

export async function POST(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.text(); // Sanity needs the raw text to verify the signature

  // 1. SECURITY CHECK
  // This verifies the request actually came from Sanity
  if (!signature || !isValidSignature(body, signature, secret)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  // 2. PARSE DATA
  const payload = JSON.parse(body);
  console.log("Sanity sent us this data:", payload);

  // 3. DO SOMETHING (Example: Clear Next.js Cache)
  // if (payload._type === 'post') {
  //   revalidatePath('/blog'); 
  // }

  return NextResponse.json({ received: true });
}