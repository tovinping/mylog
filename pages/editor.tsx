import { GetStaticProps } from 'next'
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react'
import classnames from 'classnames'
import { defaultMetaProps } from '@/components/layout/meta';
import style from './editor.module.scss'
import fetcher from '@/lib/fetcher';
import { ILogProps } from '@/lib/api/user';

export default function Editor() {
  const router = useRouter()
  const [logData, setLogData] = useState<ILogProps>({ weight: '83.55', breakfast: '两个烧麦', lunch: '一荤一素', dinner: '肉包+菜包', running: '11.25', sitUps: '120' })

  const handPublish = useCallback(() => {
    fetcher('/api/user', { method: "POST", body: JSON.stringify({ logData }), headers: { 'Content-Type': 'application/json' } })
    router.back()
  }, [router])

  return (<div className={classnames(style.editor)}>
    <div className={style.title}>
      <span onClick={handPublish}>返回</span>
      <span onClick={handPublish}>完成</span>
    </div>
    <ul className={style.list}>
      <li className={style.weight}>
        <span>体重</span>
        <input type="text" value={logData.weight} width={20} onChange={e => setLogData({ ...logData, weight: e.target.value })} />
        <span>kg</span>
      </li>
      <li className={style.running}>
        <span>跑步</span>
        <input type="text" value={logData.running} width={20} onChange={e => setLogData({ ...logData, running: e.target.value })} />
        <span>公里</span>
      </li>
      <li className={style.sitUps}>
        <span>仰卧起坐</span>
        <input type="text" value={logData.sitUps} width={20} onChange={e => setLogData({ ...logData, sitUps: e.target.value })} />
        <span>个</span>
      </li>
      <li>
        <span>早餐</span>
        <input type="text" value={logData.breakfast} width={20} onChange={e => setLogData({ ...logData, breakfast: e.target.value })} />
      </li>
      <li>
        <span>午餐</span>
        <input type="text" value={logData.lunch} width={20} onChange={e => setLogData({ ...logData, lunch: e.target.value })} />
      </li>
      <li>
        <span>晚餐</span>
        <input type="text" value={logData.dinner} width={20} onChange={e => setLogData({ ...logData, dinner: e.target.value })} />
      </li>
      
    </ul>
  </div>)
}

export const getStaticProps: GetStaticProps = async () => {

  const meta = {
    ...defaultMetaProps,
    title: "编辑日志"
  };
  return {
    props: {
      meta
    },
    revalidate: 10
  };
};