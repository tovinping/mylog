import Image from 'next/image';
import { UserResponse } from "@/lib/api/user";
import style from './index.module.scss'
function date2str(timestamp =0) {
  return new Date(timestamp).toLocaleString()
}

export function LogList({ users = [] }: { users: UserResponse[] }) {
  return (
    <ul className={style.list}>
      {users.map(user => <LogItem user={user} key={user._id} />)}
    </ul>
  )
}

function LogItem({ user }: { user: UserResponse }) {
  return <li className={style.listItem}>
    <div>
      <p className={style.des}>刚刚 {date2str(user.timestamp)}</p>
      <p className={style.title}>{user.content}</p>
    </div>
    {
      user.image ? <Image src={user.image} alt='' width={50} height={50} /> : null
    }
  </li>
}