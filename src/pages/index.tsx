import Head from 'next/head';

import styles from '../styles/home.module.scss';

const Home = () => {
    return (
        <>
            <Head>
                <title> Gig Music | Home </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>Lorem Ipsum idolor amet</h1>
                        <span>Algum texto qualquer falando algo aleatório</span>
                        <a href="#">
                            <button>Começar agora</button>
                        </a>
                    </section>

                    <img src="http://2.bp.blogspot.com/-KszEsyrYRSE/VPfxXFy0CII/AAAAAAAAkTE/MNseO3hKlkQ/s1600/guitarra-em-png-queroimagem-cei%C3%A7a-crispim.png" />
                </div>

                <hr className={styles.divider} />

                <div className={styles.sectionContent}>
                   <section>
                       <h2>Mais um titulo que dps vamos mudar</h2>
                       <span>Um subtitle qualquer</span>
                   </section>

                    <img src="http://2.bp.blogspot.com/-KszEsyrYRSE/VPfxXFy0CII/AAAAAAAAkTE/MNseO3hKlkQ/s1600/guitarra-em-png-queroimagem-cei%C3%A7a-crispim.png" />
                </div>

                <hr className={styles.divider} />

                <div className={styles.sectionContent}>
                    <img src="http://2.bp.blogspot.com/-KszEsyrYRSE/VPfxXFy0CII/AAAAAAAAkTE/MNseO3hKlkQ/s1600/guitarra-em-png-queroimagem-cei%C3%A7a-crispim.png" />

                    <section>
                        <h2>Mais um titulo que dps vamos mudar</h2>
                        <span>Um subtitle qualquer</span>
                    </section>
                </div>

                <hr className={styles.divider} />

                <div className={styles.nextLevelContent}>
                    <h2>Mais de <span>15 mil</span> alunos já levaram seu sonho musical ao próximo nível.</h2>
                    <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
                    <a href="#">
                        <button>Começar agora</button>
                    </a>
                    <p className={styles.copy}>&copy; Gig Music 2022</p>
                </div>
            </main>
        </>
    )
};

export default Home;
