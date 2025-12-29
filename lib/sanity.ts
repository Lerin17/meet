import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-12-28',
  useCdn: true, // set to `false` to bypass the edge cache
  // token: process.env.SANITY_AUTH_TOKEN, // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  return client.fetch(`*[_type == "post"]`)
}

export async function getPost(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
}

console.log('Sanity client configured with project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

const data = await client.fetch(`*[_type == "post"]`)
console.log('Fetched posts:', data)