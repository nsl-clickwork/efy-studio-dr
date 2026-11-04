'use client';

import ScrollReveal from '@/app/components/ScrollReveal';
import styles from './about.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function AboutClient() {
  const { lang } = useLanguage();
  const tr = t[lang].about;

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
        </div>
      </section>

      <section className={styles.story} data-navbar-theme="light">
        <div className={styles.storyInner}>
          <ScrollReveal>
            <div className={styles.storyHeader}>
              <span className="kicker">{tr.visionKicker}</span>
              <h2>{tr.visionTitle}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.storyGrid}>
            <ScrollReveal direction="left">
              <p>{tr.p1}</p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <p>{tr.p2}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className={styles.founder} data-navbar-theme="light">
        <div className={styles.founderInner}>
          <ScrollReveal direction="left">
            <div className={styles.founderImage}>
              <span>{tr.imgPlaceholder}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <article className={styles.founderText}>
              <span className="kicker">{tr.founderKicker}</span>
              <h2>{tr.founderTitle}</h2>
              {tr.founderStory.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className={styles.signature}>{tr.founderName}</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.closing} data-navbar-theme="light">
        <ScrollReveal>
          <span className="kicker">{tr.closingKicker}</span>
          <p className={styles.closingText}>{tr.closing}</p>
        </ScrollReveal>
      </section>
    </>
  );
}
