import { GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
    slug:string;
    title:string;
    description:string;
    cover:string;
    coverAlt:string;
    updatedAt:string;
    link:string;
    linkTarget:string
}

interface PostsProps {
    posts: Post[],
    page: string;
    totalPage: string;
}

const Posts = ({ posts: postsBlog, page, totalPage }: PostsProps) => {
    const [currentPage, setCurrentPage] = useState(Number(page))
    const [posts, setPosts] = useState(postsBlog ?? []);

    const getPosts = async (pageNumber:number) => {
        const prismic = getPrismicClient();
        return await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            orderings: '[document.last_publication_date desc]',
            fetch: ['post.title', 'post.description', 'post.cover', 'post.link_action'],
            pageSize: 5,
            page: String(pageNumber)
        });
    }

    const navigatePage = async (pageNumber:number) => {
        const response = await getPosts(pageNumber);

        if (response.results.length === 0) {
            return;
        }

        const retrievedPosts = response.results.map(post => {
            return {
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                coverAlt: post.data.cover.alt,
                link: post.data.link.url,
                linkTarget: post.data.link.target,
                updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }),
            }
        });

        setCurrentPage(pageNumber);
        setPosts(retrievedPosts);
    }

    return (
        <>
            <Head>
                <title>Gig Music | Conteúdos</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.slug} href={post.link ? post.link : `/posts/${post.slug}`}>
                            <a key={post.slug} target={post.linkTarget}>
                                <Image
                                    className={styles.img}
                                    width={720}
                                    height={410}
                                    quality={100}
                                    src={post.cover}
                                    alt={post.coverAlt}
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcfAYAAfgBYaBu8msAAAAASUVORK5CYII="
                                />
                                <strong>{post.title}</strong>
                                <time>{post.updatedAt}</time>
                                <p>{post.description}</p>
                            </a>
                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        {Number(currentPage) >= 2 && (
                            <div>
                                <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft size={25} color="#fff" />
                                </button>

                                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                                    <FiChevronLeft size={25} color="#fff" />
                                </button>
                            </div>
                        )}

                        {Number(currentPage) < Number(totalPage) && (
                            <div>
                                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                                    <FiChevronRight size={25} color="#fff" />
                                </button>

                                <button onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight size={25} color="#fff" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]',
        fetch: ['post.title', 'post.description', 'post.cover', 'post.link_action'],
        pageSize: 5
    });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
            cover: post.data.cover.url,
            coverAlt: post.data.cover.alt,
            link: post.data.link_action.url ?? '',
            linkTarget: post.data.link_action.target ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
        }
    });

    return {
        props: {
            posts,
            page: response.page,
            totalPage: response.total_pages,
        },
        revalidate: 60 * 2,
    }
}

export default Posts;
