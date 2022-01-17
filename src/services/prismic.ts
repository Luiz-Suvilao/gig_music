import Prismic from '@prismicio/client';

export function getPrismicClient(req?:unknown) {
    return Prismic.client('https://gigmusic.prismic.io/api/v2', {
        req
    });
}
