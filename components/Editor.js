import { useState } from 'react'

export default function Editor({ value, onChange }) {
  const [local, setLocal] = useState(value)

  function update(path, v) {
    const n = { ...local }
    n[path] = v
    setLocal(n)
    onChange(n)
  }

  return (
    <div className="panel editor">
      <h3>Editor</h3>
      <div className="field">
        <label className="small">Name</label>
        <input value={local.name} onChange={(e)=>update('name', e.target.value)} />
      </div>
      <div className="field">
        <label className="small">Title</label>
        <input value={local.title} onChange={(e)=>update('title', e.target.value)} />
      </div>
      <div className="field">
        <label className="small">Summary</label>
        <textarea rows={4} value={local.summary} onChange={(e)=>update('summary', e.target.value)} />
      </div>
      <div className="field">
        <label className="small">Experience (JSON array)</label>
        <textarea rows={6} value={JSON.stringify(local.experience, null, 2)} onChange={e=>{
          try{ const arr = JSON.parse(e.target.value); update('experience', arr);}catch(err){/* ignore */}
        }} />
      </div>
    </div>
  )
}
