import React, { useEffect, useState } from 'react'
import styles from '../../styles/Blogpost.module.css'
import { useRouter } from 'next/router'
import * as fs from 'fs'

const Blogpost = (props) => {
    const router = useRouter()
    const [blogpost, setblogpost] = useState(props.myBlog)
    // useEffect(()=>{
    //   if (!router.isReady) return;
    //   const {slug} = router.query;
    //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a)=>{
    //     return a.json();
    //   }).then((item)=>{
    //     setblogpost(item)
    //   })
    // },[router.isReady])
  return (
    <div className={styles.container}>
        <main className={styles.main}>
            <h1>{blogpost && blogpost.title}</h1>
            <hr />
            <p>{blogpost && blogpost.content}</p>
        </main>
    </div>
  )
}
// Server Side Rendering

// export async function getServerSideProps(context) {
//   const {slug} = context.query;
//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   let myBlog = await data.json();
//   return {
//     props: {myBlog}
//   }
    
// }

// Static Site Generation

export async function getStaticPaths(){
  let allb = await fs.promises.readdir('blogdata');
  allb = allb.map((item)=>{
    return {params: {slug: item.split(".")[0]}}
  })
  return {
    paths: allb,
    fallback: true
  };
}

export async function getStaticProps(context) {
  const {slug} = context.params;
  
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8')

  return {
    props: {myBlog: JSON.parse(myBlog)}
  }
    
}

export default Blogpost