import type { FunctionComponent } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

interface RichSelectItem {
  key: string
  label: string
  description?: string
}

interface RichSelectProps {
  label: string
  items: RichSelectItem[]
  value: string
  onChange: (key: string) => void
  class?: string
}

export const RichSelect: FunctionComponent<RichSelectProps> = ({
  label,
  items,
  value,
  onChange,
  class: className,
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = items.find((i) => i.key === value)

  const handleSelect = useCallback(
    (key: string) => {
      onChange(key)
      setOpen(false)
    },
    [onChange],
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div class={`form-control ${className ?? ''}`}>
      <div class="label">
        <span class="label-text">{label}</span>
      </div>
      <div ref={containerRef} class="relative">
        <button
          type="button"
          class="select select-bordered select-sm w-full text-left"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selected?.label ?? '—'}
        </button>
        {open && (
          <ul class="menu menu-sm bg-base-200 rounded-box shadow-lg border border-base-300 absolute z-50 top-full mt-1 right-0 sm:w-max min-w-full max-h-80 overflow-y-auto p-1 flex-nowrap">
            {items.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  class={`flex flex-col items-start gap-0 ${item.key === value ? 'active' : ''}`}
                  onClick={() => handleSelect(item.key)}
                >
                  <span class="font-medium">{item.label}</span>
                  {item.description && (
                    <span class="text-xs text-base-content/50 whitespace-normal">
                      {item.description}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected?.description && (
        <div class="label">
          <span class="label-text-alt text-base-content/50 text-wrap">{selected.description}</span>
        </div>
      )}
    </div>
  )
}
