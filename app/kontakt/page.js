'use client';

import { useState } from 'react';
import ScrollReveal from '@/app/components/ScrollReveal';
import { studioInfo } from '@/app/data/content';
import styles from './kontakt.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function KontaktPage() {
  const [formStatus, setFormStatus] = useState('idle');
  const { lang } = useLanguage();
  const tr = t[lang].kontakt;

  // No mail backend yet: hand the message to the visitor's email app, addressed to the studio
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subjectLabel = tr.form.subjectOptions.find((opt) => opt.value === data.get('subject'))?.label;
    const subject = `${subjectLabel} – ${data.get('name')}`;
    const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;

    window.location.href = `mailto:${studioInfo.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus('success');
  };

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
          <p>{tr.sub}</p>
        </div>
      </section>

      <section className={styles.contact} data-navbar-theme="light">
        <div className={styles.contactInner}>
          <ScrollReveal>
            <div className={styles.infoCol}>
              <h2>{tr.infoTitle}</h2>
              <div className={styles.infoGroup}>
                <span className="kicker">{tr.adresseLabel}</span>
                <p>
                  <strong>{studioInfo.name}</strong><br />
                  {studioInfo.address.street}<br />
                  {studioInfo.address.zip} {studioInfo.address.city}<br />
                  {studioInfo.address.area}
                </p>
              </div>
              <div className={styles.infoGroup}>
                <span className="kicker">{tr.emailLabel}</span>
                <p><a href={`mailto:${studioInfo.contact.email}`}>{studioInfo.contact.email}</a></p>
              </div>
              <div className={styles.infoGroup}>
                <span className="kicker">{tr.hoursLabel}</span>
                <p>
                  {studioInfo.openingHours.weekdays}<br />
                  {studioInfo.openingHours.saturday}<br />
                  {studioInfo.openingHours.sunday}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.formCol}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{tr.form.name}</label>
                  <input type="text" id="name" name="name" required placeholder={tr.form.namePlaceholder} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{tr.form.email}</label>
                  <input type="email" id="email" name="email" required placeholder={tr.form.emailPlaceholder} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{tr.form.subject}</label>
                  <select id="subject" name="subject">
                    {tr.form.subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{tr.form.message}</label>
                  <textarea id="message" name="message" rows="5" required placeholder={tr.form.messagePlaceholder}></textarea>
                </div>

                <button
                  type="submit"
                  className={`btn btn--dark ${styles.submitBtn}`}
                  id="contact-submit-btn"
                >
                  {tr.form.submit}
                </button>

                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    {tr.form.success}{' '}
                    <a href={`mailto:${studioInfo.contact.email}`}>{studioInfo.contact.email}</a>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
