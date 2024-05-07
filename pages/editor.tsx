import { GetStaticProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { defaultMetaProps } from '@/components/layout/meta';

import style from './editor.module.scss'
import { useRouter } from 'next/router';
const temp =`
5.5
5.5.1
5.5.2
`
export default function Editor({ onPublish }: { onPublish: (data: string) => void }) {
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [data, setData] = useState(temp)
  useEffect(() => {
    if (!inputRef.current)return;
    inputRef.current.value = temp
  }, [])
  return (<div className={classnames(style.editor)}>
    <div className={style.title}>
      <span onClick={() => router.back()}>返回</span>
      <span>完成</span>
    </div>
    <textarea ref={inputRef} className={style.textarea} onChange={(e) => setData(e.target.value)}>

    </textarea>
  </div>)
}

export const getStaticProps: GetStaticProps = async () => {

  const meta = {
    ...defaultMetaProps,
    title: `Settings | MongoDB Starter Kit`
  };
  return {
    props: {
      meta
    },
    revalidate: 10
  };
};