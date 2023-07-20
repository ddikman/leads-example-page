import path from 'path';
import fs from 'fs/promises';
import PostCard, { Post } from './post_card';
import Link from 'next/link';

async function getPosts(): Promise<Post[]> {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/posts.json', 'utf8');
  return JSON.parse(fileContents) as Post[];
}

interface Props {
  searchParams: {
    page: number | undefined
  } | undefined
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams?.page ? Number(searchParams?.page) : 1
  const allPosts = await getPosts();
  const posts = allPosts.slice((page - 1) * 10, page * 10);

  const nextPage = (page * 10) >= allPosts.length ? null : page + 1
  const prevPage = page > 1 ? page - 1 : null

  return (
    <div>
      <h2>Recent posts</h2>
      {posts.map((post: Post, index: number) => (<PostCard post={post} key={index} />))}

      <div className='flex flex-row justify-between'>
        { prevPage ? <Link className='prev-page' href={`?page=${prevPage}`}>Prev page</Link> : <span className='opacity-30'>Prev page</span>}
        { nextPage ? <Link className='next-page' href={`?page=${nextPage}`}>Next page</Link> : <span className='opacity-30'>Next page</span>}
      </div>
    </div>
  )
}
