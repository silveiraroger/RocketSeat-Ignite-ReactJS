import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import { RichText } from "prismic-dom";
import Link from "next/link"
import React, { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';
import { useSession } from "next-auth/client";
import router from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session, post.slug])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue readding?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}


/* *** Para gerar páginas estáticas no build ***
Paths: Defino os parâmetros das telas que serão geradas no build
  (Com o paths vazio, o carregamento statico é feito após o primeiro acesso a página)
Falback: 
    true: O primeiro carregamento é feito pelo browser, abre a tela e depois carrega as informações
    false: Se a página não foi gerada de forma estática ainda, vai retornar um 404
    blocking: O primeiro carregamento é feito no servidor, retorna o conteúdo ja carregado
*/

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { slug: '' } }
//     ],
//     fallback: 'blocking'
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30 //30 minutus
  }
}