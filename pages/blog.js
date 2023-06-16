import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "../styles/Blog.module.css"
import * as fs from 'fs'

const Blog = (props) => {
  const [blogs, setblogs] = useState(props.allBlogs)

  return (
    <div className={styles.container}>
      <div className={styles.blogs}>
        {blogs.map((item) => {
          return <div className={styles.blogItem} key={item.slug}>
              <h3>{item.title}</h3>
            <p>{item.content.substr(0, 200)}</p>
            <Link href={`/blogpost/${item.slug}`}>
              <button className={styles.btn}>Read More</button>
            </Link>
          </div>
        })}

      </div>
    </div>
  )
}

// Server Side rendering

// export async function getServerSideProps() {
//   let data = await fetch("http://localhost:3000/api/blogs");
//   let allBlogs = await data.json();
//   return {
//     props: {allBlogs}
//   }

// }
// Static Site Generation

export async function getStaticProps() {
  let data = await fs.promises.readdir(`blogdata`)
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8');
    allBlogs.push(JSON.parse(myfile))

  }
  return {
    props: { allBlogs }
  }

}
export default Blog