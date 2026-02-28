/**
 * Prepends the Next.js basePath to a given image path.
 * This is necessary because plain <img> tags don't automatically
 * apply the basePath unlike next/image.
 * 
 * In GitHub Pages deployment, basePath = '/healthy-foods'
 * Locally, basePath = ''
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function getImagePath(src: string): string {
    return `${BASE_PATH}${src}`;
}
