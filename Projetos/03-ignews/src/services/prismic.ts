import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  console.log('process.env.PRISMIC_ENDPOINT', process.env.PRISMIC_ENDPOINT)
  console.log('process.env.PRISMIC_ACCESS_TOKEN', process.env.PRISMIC_ACCESS_TOKEN)

  const prismic = Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );

  return prismic;
}