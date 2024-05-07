import { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import style from './editor.module.scss'
const temp =`
5.5
5.5.1
5.5.2
`
export function Editor({ onPublish }: { onPublish: (data: string) => void }) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState('')
  useEffect(() => {
    if (!inputRef.current)return;
    inputRef.current.value = temp
    setVisible(true)
  }, [])
  return (<div className={classnames(style.editor, visible ? style.visible : style.hidden)}>
    <div className={style.title}>
      <span onClick={() => onPublish(data)}>返回</span>
      <span>更多</span>
    </div>
    <textarea ref={inputRef} className={style.textarea} onChange={(e) => setData(e.target.value)}>

    </textarea>
  </div>)
}