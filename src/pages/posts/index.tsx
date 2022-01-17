import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight
} from 'react-icons/fi';

import thumbImg from '../../../public/images/thumb.jpg';

import styles from './styles.module.scss';

const Posts = () => {
    return (
        <>
            <Head>
                <title>Gig Music | Conteúdos</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link href="#">
                        <a>
                            <Image
                                className={styles.img}
                                width={720}
                                height={410}
                                quality={100}
                                src={thumbImg}
                            />
                            <strong>Passos para a evolução</strong>
                            <time>14 julho 2021</time>
                            <p>Lorem impsun idolor amet sit f#</p>
                        </a>
                    </Link>

                    <div className={styles.buttonNavigate}>
                        <div>
                            <button>
                                <FiChevronsLeft size={25} color="#fff" />
                            </button>

                            <button>
                                <FiChevronLeft size={25} color="#fff" />
                            </button>
                        </div>

                        <div>
                            <button>
                                <FiChevronsRight size={25} color="#fff" />
                            </button>

                            <button>
                                <FiChevronRight size={25} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Posts;
