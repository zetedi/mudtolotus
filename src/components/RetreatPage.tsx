import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { copy, languages, languageNames, type Lang } from '@/data/retreat'
import { img } from '@/data/images'
import { langPath } from '@/data/site'
import { RegistrationForm } from '@/components/RegistrationForm'
import { StayDetails, PlaceGallery } from '@/components/StayGallery'

type Copy = (typeof copy)[Lang]
type Props = { t: Copy }

// Small decorative uses of the emblem (header, list bullets, footer).
const emblem = { src: img('lotus-emblem.png', 120), width: 120, height: 109 }

const button =
  'rounded-full bg-terra font-label uppercase italic text-cream transition hover:bg-ink focus-visible:bg-ink'
const outlineButton =
  'inline-block rounded-full border border-terra px-6 py-3 font-label text-lg uppercase italic tracking-[0.15em] text-terra transition hover:bg-terra hover:text-cream'

export function RetreatPage({ lang }: { lang: Lang }) {
  const t = copy[lang]
  return (
    <div className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-label focus:uppercase focus:tracking-[0.15em] focus:text-cream"
      >
        {t.nav.skip}
      </a>
      <Header t={t} lang={lang} />
      <main id="main">
        <Hero t={t} />
        <Facts t={t} />
        <Story t={t} />
        <Journey t={t} />
        <Included t={t} />
        <Guides t={t} />
        <Pricing t={t} />
        <Join t={t} lang={lang} />
      </main>
      <footer className="bg-ink px-5 py-12 text-center text-cream/80">
        <img {...emblem} alt="" className="mx-auto mb-5 w-14 opacity-90" loading="lazy" />
        <p className="font-label text-sm uppercase italic tracking-[0.25em]">{t.footer}</p>
      </footer>
    </div>
  )
}

function Header({ t, lang }: Props & { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['#story', t.nav.story],
    ['#journey', t.nav.journey],
    ['#included', t.nav.included],
    ['#guides', t.nav.guides],
    ['#prices', t.nav.pricing],
  ] as const

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <a href="#top" className="flex items-center gap-2" aria-label="From Mud to Lotus">
          <img {...emblem} alt="" className="w-9" />
          <span dir="ltr" lang="en" className="hidden font-display text-lg text-terra sm:inline">
            From Mud <em className="text-lotus">to lotus</em>
          </span>
        </a>
        <nav className="hidden items-center gap-4 lg:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-label text-sm uppercase italic tracking-[0.2em] text-terra underline-offset-4 transition hover:text-ink hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label={t.nav.language}
            className="flex rounded-full border border-terra/40 p-0.5 font-label text-xs uppercase tracking-widest"
          >
            {languages.map((l) => (
              <Link
                key={l}
                to={langPath[l]}
                hash
                hashScrollIntoView={false}
                resetScroll={false}
                lang={l}
                hrefLang={l}
                aria-current={lang === l ? 'page' : undefined}
                className={`rounded-full px-2.5 py-1 transition sm:px-3 ${
                  lang === l ? 'bg-terra text-cream' : 'text-terra hover:text-ink'
                }`}
              >
                {l === 'ar' ? languageNames.ar : l}
                {l !== 'ar' && <span className="sr-only"> {languageNames[l]}</span>}
              </Link>
            ))}
          </nav>
          <a href="#join" className={`${button} px-4 py-2 text-sm tracking-[0.15em]`}>
            {t.nav.join}
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero({ t }: Props) {
  return (
    <section
      id="top"
      className="mud-bg mud-bg-hero relative flex min-h-svh flex-col items-center justify-between px-5 pt-24 pb-10 text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-sand/95 via-sand/55 to-transparent" />
      <p className="animate-rise relative flex w-full max-w-2xl justify-between font-label text-base uppercase italic tracking-[0.18em] text-terra sm:text-2xl">
        <span>{t.hero.eyebrowLeft}</span>
        <span>{t.hero.eyebrowRight}</span>
      </p>

      <div className="parallax-float relative flex flex-col items-center">
        <h1 className="animate-rise [animation-delay:150ms]">
          <span className="sr-only">From Mud to Lotus</span>
          <img
            src={img('title.png', 1400)}
            srcSet={`${img('title.png', 800)} 800w, ${img('title.png', 1400)} 1400w`}
            sizes="(max-width: 727px) 88vw, 640px"
            alt=""
            className="w-[min(88vw,640px)]"
            width={1400}
            height={718}
            fetchPriority="high"
          />
        </h1>
        <img
          src={img('lotus-emblem.png', 900)}
          srcSet={`${img('lotus-emblem.png', 500)} 500w, ${img('lotus-emblem.png', 900)} 900w`}
          sizes="(max-width: 607px) 56vw, 340px"
          alt=""
          className="animate-sway mt-4 w-[min(56vw,340px)] drop-shadow-[0_18px_30px_rgba(79,42,31,0.25)]"
          width={900}
          height={820}
        />
      </div>

      <div className="animate-rise relative flex flex-col items-center gap-6 [animation-delay:400ms]">
        <p className="flex flex-wrap justify-center gap-x-10 gap-y-1 font-label text-xl uppercase italic tracking-[0.12em] text-terra sm:text-3xl">
          <span>{t.hero.place}</span>
          <span>{t.hero.dates}</span>
        </p>
        <a href="#join" className={`${button} px-8 py-4 text-lg tracking-[0.2em] shadow-lg hover:-translate-y-0.5`}>
          {t.hero.cta}
        </a>
      </div>
    </section>
  )
}

function Facts({ t }: Props) {
  return (
    <section className="bg-terra px-5 py-8 text-cream">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
        {t.facts.map((f) => (
          <div key={f.label}>
            <dt className="font-label text-xs uppercase italic tracking-[0.3em] text-cream/90">{f.label}</dt>
            <dd className="mt-1 font-display text-lg sm:text-xl">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Story({ t }: Props) {
  const s = t.story
  return (
    <section id="story" className="scroll-mt-16 bg-sand px-5 py-20 sm:py-28">
      <div className="relative mx-auto max-w-4xl">
        <img
          src={img('lotus-frame.png', 1000)}
          alt=""
          className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain object-bottom md:block"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-md space-y-8 text-center leading-[2.1] tracking-[0.08em] text-terra md:pt-14 md:pb-36">
          <p>
            {s.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <span className="my-2 block font-display text-3xl italic leading-tight tracking-normal text-lotus sm:text-4xl">
              {s.highlight}
            </span>
            {s.residency.map((l, i) =>
              l ? (
                <span key={i} className="block">
                  {l}
                </span>
              ) : (
                <span key={i} className="block h-6" />
              ),
            )}
          </p>
          <p>
            {s.lotus.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
        <img
          src={img('lotus-border.png', 900)}
          alt=""
          width={900}
          height={182}
          className="mx-auto mt-12 w-full max-w-md md:hidden"
          loading="lazy"
        />
      </div>
    </section>
  )
}

function SectionTitle({
  children,
  kicker,
  as: Heading = 'h2',
}: {
  children: ReactNode
  kicker?: string
  as?: 'h2' | 'h3'
}) {
  return (
    <Heading className="mb-6 text-center font-display text-lotus">
      {kicker && <span className="block text-5xl leading-none sm:text-7xl">{kicker}</span>}
      <span className="block text-4xl italic leading-tight sm:text-6xl">{children}</span>
    </Heading>
  )
}

function Journey({ t }: Props) {
  return (
    <section id="journey" className="mud-bg relative scroll-mt-16 px-5 py-20 sm:py-28">
      <div className="absolute inset-0 bg-sand/40" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-16 text-center font-label text-lg uppercase italic tracking-[0.3em] text-terra">
          {t.journeyTitle}
        </h2>
        <div className="space-y-28">
          {t.phases.map((phase) => (
            <div key={phase.label}>
              <SectionTitle as="h3" kicker={`${phase.label} :`}>
                {phase.title}
              </SectionTitle>
              <p className="mx-auto mb-14 max-w-xl text-center leading-loose tracking-[0.08em] text-terra">
                {phase.intro}
              </p>
              <ol className="grid gap-8 md:grid-cols-3">
                {phase.steps.map((step, i) => (
                  <li
                    key={step.image}
                    className="group overflow-hidden rounded-[1.75rem] bg-cream/80 shadow-[0_25px_60px_-35px_rgba(79,42,31,0.6)] backdrop-blur-sm"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={img(step.image, 640, 800)}
                        alt={step.alt}
                        width={640}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-start gap-4 p-6">
                      <span aria-hidden="true" className="font-display text-6xl leading-none text-terra">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="pt-1 leading-relaxed tracking-[0.05em] text-terra">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Included({ t }: Props) {
  return (
    <section id="included" className="scroll-mt-16 bg-sand px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="mb-10 text-4xl tracking-[0.08em] text-terra sm:text-5xl">{t.included.title}</h2>
          <ul className="space-y-4">
            {t.included.items.map((item) => (
              <li key={item} className="flex gap-4 border-b border-terra/15 pb-4 tracking-[0.06em] text-terra">
                <img {...emblem} alt="" className="mt-0.5 h-6 w-6 shrink-0 object-contain" loading="lazy" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="#prices" className={`mt-8 ${outlineButton}`}>
            {t.pricing.title}
          </a>
        </div>
        <figure>
          <img
            src={img('scarab.jpg', 970)}
            alt={t.included.imageAlt}
            width={970}
            height={647}
            loading="lazy"
            decoding="async"
            className="w-full rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(79,42,31,0.7)]"
          />
          <img
            src={img('lotus-border.png', 900)}
            alt=""
            width={900}
            height={182}
            className="mt-10 w-full"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

function Guides({ t }: Props) {
  return (
    <section id="guides" className="relative scroll-mt-28 bg-cream px-5 py-20 sm:py-28">
      <div className="relative mx-auto max-w-5xl">
        <p className="mx-auto mb-20 max-w-2xl text-center leading-[2.1] tracking-[0.08em] text-terra">
          {t.invitation.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="mt-6 block font-display text-3xl italic leading-snug tracking-normal text-lotus sm:text-4xl">
            {t.invitation.closing.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>
        </p>
        <h2 className="mb-12 text-center font-label text-lg uppercase italic tracking-[0.3em] text-terra">
          {t.guidesTitle}
        </h2>
        <ul className="grid gap-12 sm:grid-cols-3">
          {t.guides.map((g) => (
            <li key={g.name} className="min-w-0 text-center">
              <div className="mx-auto aspect-square w-full max-w-56 overflow-hidden rounded-full shadow-xl ring-8 ring-sand/60">
                <img
                  src={img(g.image, 480, 480, g.position)}
                  alt={g.name}
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl tracking-[0.08em] text-terra">{g.name}</h3>
              <p className="text-sm tracking-[0.1em] text-terra">{g.role}</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-loose text-ink">{g.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Pricing({ t }: Props) {
  const p = t.pricing
  return (
    <section id="prices" className="scroll-mt-28 bg-sand px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle>{p.title}</SectionTitle>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-ink">{p.intro}</p>
        <dl className="mt-10 grid overflow-hidden rounded-[2rem] border border-terra/20 sm:grid-cols-2">
          <div className="bg-terra p-8 text-center text-cream sm:p-10">
            <dt className="font-label text-xl uppercase italic tracking-[0.15em]">{p.earlyBird}</dt>
            <dd className="mt-4 font-display text-6xl">{p.earlyPrice}</dd>
            <dd className="mt-3 text-sm leading-relaxed">{p.earlyDeadline}</dd>
          </div>
          <div className="bg-cream p-8 text-center text-terra sm:p-10">
            <dt className="font-label text-xl uppercase italic tracking-[0.15em]">{p.regular}</dt>
            <dd className="mt-4 font-display text-6xl">{p.regularPrice}</dd>
          </div>
        </dl>
        <StayDetails t={t} />
        <PlaceGallery t={t} />
        <div className="text-center">
          <a href="#join" className={`${button} inline-block px-8 py-4 text-lg tracking-[0.2em]`}>
            {p.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

function Join({ t, lang }: Props & { lang: Lang }) {
  return (
    <section id="join" className="mud-bg relative scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-sand/60" />
      <div className="relative mx-auto max-w-3xl">
        <SectionTitle>{t.form.title}</SectionTitle>
        <p className="mx-auto mb-12 max-w-xl text-center leading-relaxed tracking-wide text-terra">{t.form.intro}</p>
        <RegistrationForm key={lang} t={t.form} lang={lang} />
      </div>
    </section>
  )
}
