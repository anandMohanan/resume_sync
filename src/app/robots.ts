import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
    rules: [
        {
            userAgent: '*',
            disallow: ['/dist/', '/docs/'],
            allow: ['/dist/latest/', '/dist/latest/docs/api/', '/api/'],
        },
    ],
});

export default robots;

export const dynamic = 'error';
