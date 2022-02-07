import { GetStaticProps } from 'next';
import Head from 'next/head';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../services/prismic';

import Show from '/public/images/show.jpeg';

import styles from '../styles/home.module.scss';

type Content = {
    title:string;
    subtitle:string;
    linkAction:string;
    linkActionTarget:string;
    buttonTitle:string;
    banner:string;
    bannerAlt:string;
    sectionTwoTitle:string;
    sectionTwoSubtitle:string;
    sectionTwoBanner:string;
    sectionTwoBannerAlt:string;
    sectionTreeTitle:string;
    sectionTreeSubtitle:string;
    sectionTreeBanner:string;
    sectionTreeBannerAlt:string;
    footerTitle:string;
    finalSectionBanner:string;
    finalSectionBannerAlt:string;
}

interface ContentProps {
    content: Content;
}

const Home = ({ content }: ContentProps) => {
    return (
        <>
            <Head>
                <title> Gig Music | Home </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>{content.title}</h1>
                        <span>{content.subtitle}</span>
                        <a rel="noreferrer" href={content.linkAction} target={content.linkActionTarget}>
                            <button>{content.buttonTitle}</button>
                        </a>
                    </section>

                    <img src={content.banner} alt={content.bannerAlt} />
                </div>

                <hr className={styles.divider} />

                <div className={styles.sectionContent}>
                   <section>
                       <h2>{content.sectionTwoTitle}</h2>
                       <span>{content.sectionTwoSubtitle}</span>
                   </section>

                    <img src={content.sectionTwoBanner} alt={content.sectionTwoBannerAlt} />
                </div>

                <hr className={styles.divider} />

                <div className={styles.sectionContent}>
                    <img src={content.sectionTreeBanner} alt={content.sectionTreeBannerAlt} />

                    <section>
                        <h2>{content.sectionTreeTitle}</h2>
                        <span>{content.sectionTreeSubtitle}</span>
                    </section>
                </div>

                <hr className={styles.divider} />

                <div className={styles.nextLevel}>
                    <section className={styles.nextLevelContent}>
                        <h2>{content.footerTitle}</h2>
                        <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
                        <a rel="noreferrer" href={content.linkAction} target={content.linkActionTarget}>
                            <button>Fale conosco</button>
                        </a>
                        <p className={styles.copy}>&copy; Gig Music 2022</p>
                    </section>

                    <img src={content.finalSectionBanner} alt={content.finalSectionBannerAlt}/>
                </div>
            </main>
        </>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'home')
    ]);

    const {
        title,
        sub_title,
        link_action,
        button_title,
        banner,
        section_two_title,
        section_two_sub_title,
        section_two_banner,
        section_tree_title,
        section_tree_sub_title,
        section_tree_banner,
        footer_title,
        final_section_banner
    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        subtitle: RichText.asText(sub_title),
        linkAction: link_action.url,
        linkActionTarget: link_action.target,
        buttonTitle: RichText.asText(button_title),
        banner: banner.url,
        bannerAlt: banner.alt,
        sectionTwoTitle: RichText.asText(section_two_title),
        sectionTwoSubtitle: RichText.asText(section_two_sub_title),
        sectionTwoBanner: section_two_banner.url,
        sectionTwoBannerAlt: section_two_banner.alt,
        sectionTreeTitle: RichText.asText(section_tree_title),
        sectionTreeSubtitle: RichText.asText(section_tree_sub_title),
        sectionTreeBanner: section_tree_banner.url,
        sectionTreeBannerAlt: section_tree_banner.alt,
        footerTitle: RichText.asText(footer_title),
        finalSectionBanner: final_section_banner.url,
        finalSectionBannerAlt: final_section_banner.alt,
    }

    return {
        props: {
            content
        },
        revalidate: 60 * 60,
    }
}

export default Home;
