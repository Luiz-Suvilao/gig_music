import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,300&family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.jpg" type="image/jpg" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/favicon.jpg" />

                    <meta name="theme-color" content="#111113" />
                    <meta name = "description" content="Venha conhecer a Gig Music, a melhor escola de música da baixada." />
                    <meta
                        name="keywords"
                        content="música, escola de música, gig music, guitarra, baixo, violão, canto, teclado, baixada, escola de musica na baixada, musica, escola de musica"
                    />
                </Head>

                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}
