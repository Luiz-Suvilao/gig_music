import { useEffect, useState } from 'react';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import ActiveLink from '../ActiveLink';

import styles from './styles.module.scss';

type HeaderData = {
    logo: string;
    logoAlt: string;
    link: string;
    textButton: string;
}

const Header = () => {
    const [headerData, setHeaderData] = useState<HeaderData>({} as HeaderData);

    useEffect(() => {
        (async function load() {
            const prismic = getPrismicClient();
            const response = await prismic.query([
                Prismic.predicates.at('document.type', 'header')
            ]);

            const {
                logo_header,
                link_button,
                text_button
            } = response.results[0].data;

            const headerData = {
                logo: logo_header.url,
                logoAlt: logo_header.alt,
                link: link_button.url,
                textButton: RichText.asText(text_button),
            };

            setHeaderData(headerData);
        })();
    }, []);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href="/" activeClassName={styles.active}>
                    <a>
                        <img width={80} height={50} src={headerData.logo} alt={headerData.logoAlt}/>
                    </a>
                </ActiveLink>

                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Conteúdos</a>
                    </ActiveLink>

                    <ActiveLink href="/sobre" activeClassName={styles.active}>
                        <a>Quem somos?</a>
                    </ActiveLink>
                </nav>

                <a rel="noreferrer" target="_blank" className={styles.readyButton} type="button" href={headerData.link}>{headerData.textButton}</a>
            </div>
        </header>
    )
}

export default Header;
