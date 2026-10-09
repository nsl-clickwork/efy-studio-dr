'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/app/components/ScrollReveal';
import { classes, targetGroups, studioInfo } from '@/app/data/content';
import styles from './kurse.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function KurseClient() {
  const { lang } = useLanguage();
  const tr = t[lang].kurse;

  // The 3 core disciplines
  const coreClasses = classes.slice(0, 3);

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
          <p>{tr.sub}</p>
        </div>
      </section>

      {/* ═══════════ CORE CLASSES GRID ═══════════ */}
      <section className={styles.grid} data-navbar-theme="light">
        <div className={styles.gridInner}>
          {coreClasses.map((cls, i) => (
            <ScrollReveal key={cls.slug} delay={i * 0.1}>
              <Link href={`/kurse/${cls.slug}`} className={styles.card} id={`kurse-card-${cls.slug}`}>
                <div className={styles.cardImage}>
                  <Image
                    src={cls.image}
                    alt={cls[lang].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2>{cls[lang].title}</h2>
                  <p className={styles.cardSub}>{cls[lang].subtitle}</p>
                  <p>{cls[lang].shortDesc}</p>
                  <div className={styles.cardMeta}>
                    <span>{cls.duration}</span>
                    <span>·</span>
                    <span>{cls[lang].groupSize}</span>
                  </div>
                  <span className="link-arrow">{tr.learnMore}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ TARGET GROUPS (UNIFIED) ═══════════ */}
      <section className={styles.groupsSection} id="gruppen" data-navbar-theme="cream">
        <div className={styles.groupsInner}>
          <ScrollReveal>
            <div className={styles.groupsHeader}>
              <span className="kicker">{lang === 'de' ? 'Für jeden Körper' : 'For Every Body'}</span>
              <h2>{tr.groupsTitle}</h2>
              <p>{tr.groupsSub}</p>
            </div>
          </ScrollReveal>

          <div className={styles.groupsGrid}>
            {targetGroups.map((group, idx) => (
              <ScrollReveal key={group.id} delay={idx * 0.08}>
                <div className={styles.groupCard} id={`kurse-group-${group.id}`}>
                  <div className={styles.groupCardImage}>
                    <Image
                      src={group.image}
                      alt={group[lang].title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: group.objectPosition || 'center center',
                      }}
                    />
                    <div className={styles.groupBadge}>{group[lang].badge}</div>
                  </div>
                  <div className={styles.groupCardBody}>
                    <h3>{group[lang].title}</h3>
                    <p className={styles.groupCardSub}>{group[lang].subtitle}</p>
                    <p className={styles.groupCardDesc}>{group[lang].desc}</p>
                    
                    <ul className={styles.groupHighlights}>
                      {group[lang].highlights.map((item, hIdx) => (
                        <li key={hIdx}>{item}</li>
                      ))}
                    </ul>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '0.5rem' }}>
                      <a
                        href={studioInfo.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline-dark"
                        style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', padding: '0.6rem 0.5rem' }}
                      >
                        {lang === 'de' ? 'Jetzt buchen' : 'Book now'}
                      </a>
                      <Link href="/kontakt" className="link-arrow" style={{ alignSelf: 'center', fontSize: '0.8rem' }}>
                        {lang === 'de' ? 'Anfragen' : 'Inquire'}
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA & PRICING TEASER ═══════════ */}
      <section className="section section--sand" data-navbar-theme="light">
        <ScrollReveal>
          <h2 style={{ fontStyle: 'italic', marginBottom: 'var(--space-xs)' }}>{tr.cta.title}</h2>
          <p style={{ margin: '0 auto var(--space-md)', maxWidth: '500px' }}>{tr.cta.p}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={studioInfo.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark" id="kurse-booking-btn">
              {tr.cta.btn}
            </a>
            <Link href="/preise" className="btn btn--outline-dark" id="kurse-pricing-btn">
              {lang === 'de' ? 'Preise & Tarife ansehen' : 'View Pricing & Packages'}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
