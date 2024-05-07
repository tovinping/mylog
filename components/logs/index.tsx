import Image, { ImageProps } from 'next/image';
import { UserProps } from "@/lib/api/user";
import style from './index.module.scss'

export function Logs({ users = [] }: { users: UserProps[] }) {
  return (
    <ul className={style.list}>
      {users.map(user => <LogItem user={user} key={user.email} />)}
    </ul>
  )
}

function LogItem({ user }: { user: UserProps }) {
  return <li className={style.listItem}>
    <div>
      <p className={style.des}>刚刚 {user.username}</p>
      <p className={style.title}>{user.name}</p>
    </div>
    {
      user.image ? <Image src={user.image} alt='' width={50} height={50} /> : null
    }
  </li>
}