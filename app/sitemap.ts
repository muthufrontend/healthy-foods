import { MetadataRoute } from 'next'
import { categories, foods } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://example.com'

    const categoryUrls = categories.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const foodUrls = foods.map((food) => ({
        url: `${baseUrl}/food/${food.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...categoryUrls,
        ...foodUrls,
    ]
}
