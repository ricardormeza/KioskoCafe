import Head from 'next/head';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import Layout from '../layout/Layout';


export default function Home({categorias}) {
  console.log(categorias);
  return (
    <Layout>
      <h1>Inicio</h1>
    </Layout>
  )
}

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient();

//   const categorias = await prisma.categoria.findMany();

//   // console.log(categorias);
//   return {
//     props: {
//       categorias,
//     },
//   };
// };