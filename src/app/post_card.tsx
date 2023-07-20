import Link from "next/link";

export default function PostCard({post} : { post: Post }) {
  return <div className="flex flex-col mb-6 w-full gap-2 rounded shadow-md bg-white p-3">
    <div>{ post.message }</div>
    <div className="flex flex-row justify-between text-xs">
      <Link className="user-id" href={`/user/${post.user}`}>@{post.user}</Link>
      <span className="timestamp">{post.timestamp}</span>
    </div>
  </div>
}


export interface Post {
  timestamp: String;
  message: String;
  user: String;
}