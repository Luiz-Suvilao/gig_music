import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
    FiFacebook,
    FiInstagram,
    FiYoutube,
} from 'react-icons/fi';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type About = {
    title:string;
    description:string;
    banner:string;
    bannerAlt:string;
    facebook:string;
    instagram:string;
    youtube:string;
}

interface AboutProps {
    about:About;
}

const Sobre = ({ about }: AboutProps) => {
    return (
        <>
            <Head>
                <title>Gig Music | Sobre</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.content}>
                        <h1>{about.title}</h1>

                        <p>{about.description}</p>

                        <a href={about.facebook} target="_blank">
                            <FiFacebook size={40} />
                        </a>

                        <a href={about.instagram} target="_blank">
                            <FiInstagram size={40} />
                        </a>

                        <a href={about.youtube} target="_blank">
                            <FiYoutube size={40} />
                        </a>
                    </section>

                    <img src={about.banner} alt={about.bannerAlt} />
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'about')
    ]);

    const {
        title,
        description,
        banner,
        facebook,
        instagram,
        youtube
    } = response.results[0].data;

    const about = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url,
        bannerAlt: banner.alt,
        facebook: facebook.url,
        instagram: instagram.url,
        youtube: youtube.url,
    }

    return {
        props: {
            about
        },
        revalidate: 60 * 2
    }
}

export default Sobre;
