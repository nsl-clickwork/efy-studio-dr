'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollReveal from './components/ScrollReveal';
import { classes, targetGroups, testimonials, studioInfo } from './data/content';
import { useLanguage } from './context/LanguageContext';
import { t } from './data/translations';

export default function HomePage() {
  const { lang } = useLanguage();
  const tr = t[lang].home;

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeTestimonial + 1) % testimonials.length;
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({ left: width * nextIndex, behavior: 'smooth' });
        setActiveTestimonial(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTestimonial]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      setActiveTestimonial(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
      setActiveTestimonial(index);
    }
  };

  const stripItems = [
    { label: 'Reformer', href: '/kurse/reformer' },
    { label: 'Barre', href: '/kurse/barre' },
    { label: 'Mat', href: '/kurse/mat' },
    { label: 'Women only', href: '#gruppen' },
    { label: 'Men only', href: '#gruppen' },
    { label: '50+', href: '#gruppen' },
    { label: 'Pre- & Postnatal', href: '#gruppen' },
    { label: 'Move & Grow', href: '#gruppen' },
    { label: 'Preise', href: '/preise' },
    { label: 'Curtiusstraße 9', href: '/kontakt' },
  ];
  const marqueeItems = [...stripItems, ...stripItems, ...stripItems];

  const galleryImages = [
    { type: 'video', src: '/videos/barre.mp4' },
    { src: '/images/ball.webp', alt: 'Pilates Reformer close-up' },
    { src: '/images/prenatal.webp', alt: 'Pre & Postnatal Pilates' },
    { src: '/images/barre.webp', alt: 'Barre Training' },
    { src: '/images/mat.webp', alt: 'Pilates Mat Übung' },
  ];

  return (
    <>
      {/* ═══════════ SECTION 1: HERO ═══════════ */}
      <section className={styles.hero} id="hero" data-navbar-theme="dark">
        <div className={styles.heroBg}>
          <video
            src="/videos/h264-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>{tr.hero.kicker}</p>
          <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: tr.hero.title }} />
          <p className={styles.heroSub}>{tr.hero.sub}</p>
          <div className={styles.heroCtas}>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              id="hero-booking-btn"
            >
              {tr.hero.ctaBook}
            </a>
            <Link href="/kurse" className="btn btn--outline" id="hero-courses-btn">
              {tr.hero.ctaCourses}
            </Link>
          </div>
        </div>
        <div 
          className={styles.heroScroll} 
          onClick={() => {
            document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>{tr.hero.scroll}</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 0v16M1 12l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ═══════════ SECTION 2: INTRO STRIP ═══════════ */}
      <div className={styles.introStrip} aria-hidden="true" data-navbar-theme="dark">
        <div className={styles.introStripTrack}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className={styles.introStripDot} />
              <Link href={item.href} className={styles.introStripItem} tabIndex={-1}>{item.label}</Link>
            </span>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--warm-white)', position: 'relative', zIndex: 1, overflowX: 'hidden' }}>
        {/* ═══════════ SECTION 3: PHILOSOPHY ═══════════ */}
      <section className={styles.philosophy} id="ueber-uns" data-navbar-theme="cream">
        <div className={styles.philosophyInner}>
          <div className={styles.philosophyContent}>
            <ScrollReveal direction="left">
              <span className="kicker">{tr.philosophy.kicker}</span>
              <h2>{tr.philosophy.title}</h2>
              <p>{tr.philosophy.p1}</p>
              <p>{tr.philosophy.p2}</p>
              <blockquote className={styles.philosophyQuote}>
                <p>{tr.philosophy.quote}</p>
                <cite>– {tr.philosophy.quoteAuthor} –</cite>
              </blockquote>
              <Link href="/ueber-uns" className="link-arrow">{tr.philosophy.link}</Link>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={0.2} className={styles.philosophyImage}>
              <Image
                src="/images/philosophy.png"
                alt="Zwei Frauen beim Mat Pilates im EFY STUDIOS"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover', filter: 'brightness(1.05) contrast(1.01)' }}
              />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 4: SERVICE CARDS ═══════════ */}
      <section className={styles.services} id="services" data-navbar-theme="light">
        <div className={styles.servicesInner}>
          <ScrollReveal>
            <div className={styles.servicesHeader}>
              <span className="kicker">{tr.services.kicker}</span>
              <h2>{tr.services.title}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.servicesGrid}>
            {classes.slice(0, 3).map((cls, i) => (
              <ScrollReveal key={cls.slug} delay={i * 0.15}>
                <Link href={`/kurse/${cls.slug}`} className={styles.serviceCard} id={`service-card-${cls.slug}`}>
                  <div className={styles.serviceCardImage}>
                    <Image
                      src={cls.image}
                      alt={cls[lang].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <h3>{cls[lang].title}</h3>
                    <p>{cls[lang].shortDesc}</p>
                    <span className="link-arrow">{tr.services.more}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 5: EDITORIAL REFORMER ═══════════ */}
      <section className={styles.editorial} id="editorial-reformer" data-navbar-theme="dark">
        <ScrollReveal direction="left" className={styles.editorialImage}>
          <video
            src="/videos/h264-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ScrollReveal>
        <div className={`${styles.editorialContent} ${styles['editorialContent--dark']}`}>
          <ScrollReveal direction="right">
            <span className="kicker">{tr.editorialReformer.kicker}</span>
            <h2>{tr.editorialReformer.title}</h2>
            <p>{tr.editorialReformer.p1}</p>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              id="reformer-booking-btn"
            >
              {tr.editorialReformer.btn}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 6: BARRE ═══════════ */}
      <section className={`${styles.editorial} ${styles['editorial--reverse']}`} id="editorial-barre" data-navbar-theme="cream">
        <ScrollReveal direction="right" threshold={0.2} className={styles.editorialImage}>
          <video
            src="/videos/barre.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.02)' }}
          />
        </ScrollReveal>
        <div className={`${styles.editorialContent} ${styles['editorialContent--cream']}`}>
          <ScrollReveal direction="left">
            <span className="kicker">{tr.editorialBarre.kicker}</span>
            <h2>{tr.editorialBarre.title}</h2>
            <p>{tr.editorialBarre.p1}</p>
            <Link href="/kurse/barre" className="btn btn--outline-dark" id="barre-link-btn">
              {tr.editorialBarre.btn}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 6.5: MAT PILATES ═══════════ */}
      <section className={styles.editorial} id="editorial-mat" data-navbar-theme="sand">
        <ScrollReveal direction="left" className={styles.editorialImage}>
          <video
            src="/videos/h264-2-web.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ScrollReveal>
        <div className={styles.editorialContent}>
          <ScrollReveal direction="right">
            <span className="kicker">{tr.editorialMat?.kicker}</span>
            <h2>{tr.editorialMat?.title}</h2>
            <p>{tr.editorialMat?.p1}</p>
            <Link href="/kurse/mat" className="btn btn--outline-dark" id="mat-link-btn">
              {tr.editorialMat?.btn}
            </Link>
          </ScrollReveal>
        </div>
      </section>



      {/* ═══════════ SECTION 8: TARGET GROUPS (UNIFIED) ═══════════ */}
      <section className={styles.targetGroupsSection} id="gruppen" data-navbar-theme="cream">
        <div className={styles.targetGroupsInner}>
          <ScrollReveal>
            <div className={styles.targetGroupsHeader}>
              <span className="kicker">{tr.gruppen.kicker}</span>
              <h2>{tr.gruppen.title}</h2>
              <p>{tr.gruppen.sub}</p>
            </div>
          </ScrollReveal>

          <div className={styles.targetGroupsGrid}>
            {targetGroups.map((group, idx) => (
              <ScrollReveal key={group.id} delay={idx * 0.1}>
                <div className={styles.targetGroupCard} id={`group-card-${group.id}`}>
                  <div className={styles.targetGroupCardImage}>
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
                    <div className={styles.targetGroupCardBadge}>
                      {group[lang].badge}
                    </div>
                  </div>
                  <div className={styles.targetGroupCardBody}>
                    <h3>{group[lang].title}</h3>
                    <p className={styles.targetGroupCardSub}>{group[lang].subtitle}</p>
                    <p className={styles.targetGroupCardDesc}>{group[lang].desc}</p>
                    
                    <ul className={styles.targetGroupHighlights}>
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
                        {tr.gruppen.cta}
                      </a>
                      <Link
                        href="/kontakt"
                        className="link-arrow"
                        style={{ alignSelf: 'center', fontSize: '0.8rem' }}
                      >
                        {tr.gruppen.more}
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 11: GALLERY ═══════════ */}
      <section className={styles.gallery} id="gallery" data-navbar-theme="light">
        <div className={styles.galleryInner}>
          <ScrollReveal>
            <div className={styles.galleryHeader}>
              <span className="kicker">{tr.gallery.kicker}</span>
              <h2>{tr.gallery.title}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.galleryGrid}>
            {galleryImages.map((item, i) => (
              <div key={i} className={styles.galleryItem}>
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? '50vw' : '25vw'}
                  style={{ objectFit: 'cover', objectPosition: item.pos || 'center' }}
                />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 12: TESTIMONIAL ═══════════ */}
      <section className={styles.testimonial} id="testimonials" data-navbar-theme="dark">
        <div className={styles.testimonialInner}>
          <ScrollReveal direction="fade">
            <div
              className={styles.testimonialSlider}
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {testimonials.map((testi, i) => (
                <div className={styles.testimonialSlide} key={i}>
                  <p className={styles.testimonialQuote}>{testi.quote}</p>
                  <p className={styles.testimonialAuthor}>
                    — {testi.author}, {testi.location}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.testimonialDots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.testimonialDot} ${i === activeTestimonial ? styles.testimonialDotActive : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 13: LOCATION ═══════════ */}
      <section className={styles.location} id="kontakt" data-navbar-theme="dark">
        <div className={styles.locationInner}>
          <div className={styles.locationContent}>
            <ScrollReveal direction="left">
              <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.location.kicker}</span>
              <h2>{tr.location.title}</h2>
              <p>{tr.location.p}</p>
              <address>
                <strong>EFY STUDIOS</strong><br />
                {studioInfo.address.street}<br />
                {studioInfo.address.zip} {studioInfo.address.city}<br />
                {studioInfo.address.area}
              </address>
              <div className={styles.locationCtas}>
                <a href={studioInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">{tr.location.route}</a>
                <a href={`mailto:${studioInfo.email}`} className="btn btn--outline">{tr.location.email}</a>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={0.2} className={styles.locationMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.8!2d13.307!3d52.433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCurtiusstra%C3%9Fe+9%2C+12205+Berlin!5e0!3m2!1sde!2sde!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EFY STUDIOS Standort"
              />
          </ScrollReveal>
          </div>
        </section>
      </div>

      {/* ═══════════ SECTION 14: FINAL CTA ═══════════ */}
      <section className={styles.ctaBanner} id="final-cta" data-navbar-theme="dark">
        <div className={styles.ctaBannerInner}>
          <ScrollReveal>
            <h2>{tr.finalCta.title}</h2>
            <p>{tr.finalCta.p}</p>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              id="final-booking-btn"
            >
              {tr.finalCta.btn}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
