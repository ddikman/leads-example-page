import path from 'path';
import fs from 'fs/promises';
import PostCard, { Post } from '../../post_card';
import Link from 'next/link';

async function getPosts() : Promise<Post[]> {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/posts.json', 'utf8');
  return JSON.parse(fileContents) as Post[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  posts: Post[];
}

async function getUsers() : Promise<User[]> {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/people.json', 'utf8');
  return JSON.parse(fileContents).map((user: any) => {
    return {
      ...user,
      id: user['name'].replace(' ', '.').toLowerCase(),
      posts: []
    } as User
  })
}

async function getUser(id: string) : Promise<User> {
  const users = await getUsers();
  const user = users.find((user: User) => user.id === id);

  if (user == null) {
    throw new Error('User not found')
  }

  const posts = await getPosts();
  user.posts = posts.filter((post: Post) => post.user === id);

  return user
}

export default async function Page({params} : { params: { id: string }}) {
  const user = await getUser(params.id);
  return <div>
    <div className="flex flex-row justify-between profile">
      <div><span className="name">{ user.name }</span>, <span className="role">{ user.role }</span></div>
      <Link href={`mailto:${user.email}`}>@contact</Link>
    </div>
    <hr className="my-4 border-black border-dashed" />
    <div>Posts</div>
    { user.posts.map((post: Post, index: number) => (<PostCard post={post} key={index} />)) }

    <div className='mt-8'>
      <Link href='/'>Back to top</Link>
    </div>
  </div>
}