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

const PAGE_SIZE = 25

export default async function Home({ searchParams }: Props) {
  const page = searchParams?.page ? Number(searchParams?.page) : 1
  const allPosts = await getPosts();
  const posts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const nextPage = (page * PAGE_SIZE) >= allPosts.length ? null : page + 1
  const prevPage = page > 1 ? page - 1 : null

  return (
    <div>
      <h2 className="text-2xl mb-4">Recent posts</h2>
      {posts.map((post: Post, index: number) => (<PostCard post={post} key={index} />))}

      <div className='flex flex-row justify-between px-2 mt-4'>
        { prevPage ? <Link className='prev-page' href={`?page=${prevPage}`}>Prev page</Link> : <span className='opacity-30'>Prev page</span>}
        { nextPage ? <Link className='next-page' href={`?page=${nextPage}`}>Next page</Link> : <span className='opacity-30'>Next page</span>}
      </div>
    </div>
  )
}
