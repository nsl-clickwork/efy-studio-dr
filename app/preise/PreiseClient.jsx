'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/app/components/ScrollReveal';
import { pricingCategories, studioInfo } from '@/app/data/content';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';
import styles from './preise.module.css';

export default function PreiseClient() {
  const { lang } = useLanguage();
  const tr = t[lang].preise;
  const [activeTab, setActiveTab] = useState(pricingCategories[0].id);

  const currentCategory = pricingCategories.find((c) => c.id === activeTab) || pricingCategories[0];

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

      {/* ═══════════ PRICING SECTION ═══════════ */}
      <section className={styles.pricingSection} data-navbar-theme="light">
        <div className={styles.pricingInner}>
          {/* Category Filter Tabs */}
          <div className={styles.tabsWrapper}>
            <div className={styles.tabsContainer} role="tablist" aria-label={tr.tabsTitle}>
              {pricingCategories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeTab === cat.id}
                  className={`${styles.tabBtn} ${activeTab === cat.id ? styles['tabBtn--active'] : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                  id={`tab-${cat.id}`}
                >
                  {cat[lang].name}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            {currentCategory.cards.map((card, i) => (
              <ScrollReveal key={`${currentCategory.id}-${i}`} delay={i * 0.08}>
                <div
                  className={`${styles.priceCard} ${card.highlight ? styles['priceCard--highlight'] : ''}`}
                  id={`price-card-${currentCategory.id}-${i}`}
                >
                  {card.highlight && (
                    <div className={styles.cardRibbon}>{tr.popular}</div>
                  )}

                  <div className={styles.cardHeader}>
                    <span className={styles.cardBadge}>{card.badge}</span>
                    <h2 className={styles.cardClasses}>{card.classes}</h2>
                  </div>

                  <p className={styles.cardDesc}>
                    {lang === 'de' ? card.descDe : card.descEn}
                  </p>

                  <div className={styles.cardPriceRow}>
                    <span className={styles.cardPrice}>{card.price}</span>
                  </div>

                  <div className={styles.cardActionWrapper}>
                    {card.actionDe.includes('ANFRAGEN') ? (
                      <Link
                        href="/kontakt"
                        className={`btn ${card.highlight ? 'btn--primary' : 'btn--outline-dark'} ${styles.cardBtn}`}
                      >
                        {lang === 'de' ? card.actionDe : card.actionEn}
                      </Link>
                    ) : (
                      <a
                        href={studioInfo.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${card.highlight ? 'btn--primary' : 'btn--outline-dark'} ${styles.cardBtn}`}
                      >
                        {lang === 'de' ? card.actionDe : card.actionEn}
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Features / Inclusions Box */}
          <div className={styles.infoGrid}>
            <ScrollReveal direction="left" className={styles.infoCard}>
              <h3>{tr.includedTitle}</h3>
              <ul className={styles.infoList}>
                {tr.includedItems.map((item, idx) => (
                  <li key={idx}>
                    <span className={styles.infoBullet}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15} className={`${styles.infoCard} ${styles['infoCard--alt']}`}>
              <h3>{tr.infoTitle}</h3>
              <p className={styles.infoText}>{tr.infoText}</p>
              <div className={styles.contactPrompt}>
                <p>{tr.contactCta}</p>
                <Link href="/kontakt" className="btn btn--outline" id="pricing-contact-btn">
                  {tr.contactBtn}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
