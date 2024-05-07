import { GetStaticProps } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { defaultMetaProps } from '@/components/layout/meta';

import style from './editor.module.scss'
import { useRouter } from 'next/router';
const temp = `
5.5
5.5.1
5.5.2
`
export default function Editor({ onPublish }: { onPublish: (data: string) => void }) {
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = temp
  }, [])
  const handPublish = useCallback(() => {
    if (!inputRef.current) return;
    console.log(inputRef.current.value)
    router.back()
  }, [router])
  return (<div className={classnames(style.editor)}>
    <div className={style.title}>
      <span onClick={handPublish}>返回</span>
      <span onClick={handPublish}>完成</span>
    </div>
    <textarea ref={inputRef} className={style.textarea} />
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