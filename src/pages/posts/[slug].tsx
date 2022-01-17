import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

type Post = {
    slug:string;
    title:string;
    completeDescription:string;
    cover:string;
    coverAlt:string;
    updatedAt:string;
}

interface PostProps {
    post: Post
}

const Post = ({ post }: PostProps) => {
    return (
        <>
            <Head>
                <title>Gig Music | {post.title}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        width={720}
                        height={410}
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcfAYAAfgBYaBu8msAAAAASUVORK5CYII="
                    />

                    <h1>{post.title}</h1>

                    <time>{post.updatedAt}</time>

                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.completeDescription}} />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const { slug } = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('post', String(slug), {});

    if (!response) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false,
            }
        }
    }

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        completeDescription: RichText.asHtml(response.data.complete_description),
        cover: response.data.cover.url,
        coverAlt: response.data.cover.alt,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-Br', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
    };

    return {
        props: {
            post
        }
    }
}

export default Post;
