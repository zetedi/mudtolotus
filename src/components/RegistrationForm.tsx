import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Copy, Lang } from '@/data/retreat'
import { img } from '@/data/images'
import { submitRegistration } from '@/lib/registrations'

type State = 'idle' | 'pending' | 'success' | 'error'

const field =
  'mt-2 w-full rounded-xl border border-terra/40 bg-cream px-4 py-3 text-ink focus:border-lotus focus:outline-none focus:ring-2 focus:ring-lotus/40'
const label = 'block text-sm tracking-wide text-terra'

export function RegistrationForm({ t, lang }: { t: Copy['form']; lang: Lang }) {
  const [state, setState] = useState<State>('idle')
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state === 'success') successRef.current?.focus()
  }, [state])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const data = new FormData(event.currentTarget)
    const text = (name: string) => String(data.get(name) ?? '')
    // Honeypot: bots that fill the hidden field get a quiet "success" and nothing is stored.
    if (text('bot-field')) {
      setState('success')
      return
    }
    setState('pending')
    try {
      await submitRegistration({
        name: text('name'),
        email: text('email'),
        phone: text('phone'),
        country: text('country'),
        motivation: text('motivation'),
        language: lang,
      })
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[2rem] border border-terra/30 bg-sand/70 p-10 text-center focus:outline-none"
      >
        <img src={img('lotus-emblem.png', 240)} alt="" width={240} height={219} className="mx-auto mb-6 w-28" />
        <p className="font-display text-3xl italic text-terra">{t.success}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
      className="rounded-[2rem] border border-terra/20 bg-sand/70 p-6 shadow-[0_30px_80px_-40px_rgba(90,46,34,0.5)] backdrop-blur-sm sm:p-10"
    >
      <p hidden aria-hidden="true">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">{t.title}</legend>
        <div>
          <label htmlFor="reg-name" className={label}>
            {t.name}
          </label>
          <input id="reg-name" name="name" dir="auto" autoComplete="name" required maxLength={100} className={field} />
        </div>
        <div>
          <label htmlFor="reg-email" className={label}>
            {t.email}
          </label>
          <input id="reg-email" name="email" dir="ltr" type="email" autoComplete="email" required maxLength={254} className={field} />
        </div>
        <div>
          <label htmlFor="reg-phone" className={label}>
            {t.phone} <span className="text-ink/80">({t.optional})</span>
          </label>
          <input id="reg-phone" name="phone" dir="ltr" type="tel" autoComplete="tel" maxLength={40} className={field} />
        </div>
        <div>
          <label htmlFor="reg-country" className={label}>
            {t.country}
          </label>
          <input id="reg-country" name="country" dir="auto" autoComplete="country-name" required maxLength={80} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reg-motivation" className={label}>
            {t.motivation}
          </label>
          <p id="reg-motivation-hint" className="mt-1 text-xs leading-relaxed text-ink/80">
            {t.motivationHint}
          </p>
          <textarea
            id="reg-motivation"
            name="motivation"
            dir="auto"
            required
            maxLength={2000}
            rows={5}
            aria-describedby="reg-motivation-hint"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-terra px-8 py-4 font-label text-lg uppercase italic tracking-[0.2em] text-cream transition hover:bg-ink disabled:opacity-60 sm:w-auto"
          >
            {state === 'pending' ? t.sending : t.submit}
          </button>
        </div>
      </fieldset>
      <p role="alert" aria-live="assertive" className="mt-5 text-sm text-terra">
        {state === 'error' ? t.error : ''}
      </p>
    </form>
  )
}
