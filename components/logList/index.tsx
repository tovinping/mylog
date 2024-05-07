import Image from 'next/image';
import { UserResponse } from "@/lib/api/user";
import style from './index.module.scss'

function formatDate(timestamp = 0) {
  const date = new Date(timestamp);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设置为当天开始时间

  if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
    // 如果是今天，只显示时间
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date.getFullYear() === today.getFullYear()) {
    // 如果是今年，显示月份和时间
    return `${date.toLocaleString('default', { month: 'long', day: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    // 其他情况，显示年月日和时间
    return date.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
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
      <p className={style.time}>{formatDate(user.timestamp)}</p>
      <p className={style.title}>{user.content}</p>
    </div>
    {
      user.image ? <Image src={user.image} alt='' width={50} height={50} /> : null
    }
  </li>
}