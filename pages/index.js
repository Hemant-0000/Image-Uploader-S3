import Head from 'next/head'
import Navbar from '../components/Navbar'
import Upload from '../components/Upload'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Image Uploader S3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />
      <Upload />

    </div>
  )
}
