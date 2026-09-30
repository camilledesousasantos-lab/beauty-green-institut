function MobileFrame({ label, children, current }) {
  const [menu, setMenu] = React.useState(false);
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>{label}</p>
      <div style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', border: '1px solid var(--line-hairline)', background: 'var(--surface-page)' }}>
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
          <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-page)', borderBottom: 'var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
            <Logo size={32} wordmarkSize={14} src={logoSrcFor('brun')} />
            <button onClick={() => setMenu(true)} aria-label="Ouvrir le menu"
              style={{ width: 48, height: 48, background: 'none', border: 0, cursor: 'pointer', display: 'grid', alignContent: 'center', gap: 5, justifyItems: 'end' }}>
              <span style={{ display: 'block', width: 22, borderTop: '1px solid var(--bg-brun)' }} />
              <span style={{ display: 'block', width: 14, borderTop: '1px solid var(--bg-brun)' }} />
            </button>
          </header>
          {children}
          <div style={{ height: 92 }} />
        </div>
        <a href={window.BG.planity}
          style={{ position: 'absolute', left: 16, right: 16, bottom: 16, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: 'var(--ls-button)', textTransform: 'uppercase', boxShadow: 'var(--shadow-soft)' }}>
          Prendre rendez-vous
        </a>
        <MobileMenu open={menu} onClose={() => setMenu(false)} logoSrc={logoSrcFor('brun')} current={current} />
      </div>
    </div>
  );
}

const mPad = { padding: '0 20px' };

function HomeMobile() {
  const B = window.BG;
  return (
    <div>
      <div style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--surface-muted)' }}>
        <img src={img('institut-devanture.jpeg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '42% center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(243,239,232,0) 0%, rgba(243,239,232,.15) 30%, rgba(243,239,232,.92) 52%, rgba(243,239,232,.97) 100%)' }} />
        <div style={{ position: 'relative', ...mPad, paddingTop: 200, paddingBottom: 40 }}>
          <SectionLabel tone="brun" style={{ marginBottom: 18 }}>{B.home.label}</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 48, lineHeight: 1.05, color: 'var(--text-primary)' }}>Beauty Green<br />Institut</h1>
          <p style={{ marginTop: 20, fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontStyle: 'italic', fontSize: 21, color: 'var(--brun-80)' }}>{B.home.accroche}</p>
        </div>
      </div>
      <div style={{ ...mPad, paddingTop: 28, paddingBottom: 48 }}>
        <a href="#" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 48, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--ls-button)', textTransform: 'uppercase', color: 'var(--text-accent)', borderBottom: '1px solid var(--line-accent)' }}>Découvrir l'institut</a>
      </div>
      <div style={{ ...mPad, paddingTop: 40, paddingBottom: 48, background: 'var(--surface-raised)' }}>
        <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 24, lineHeight: 1.5 }}>{B.home.intro}</p>
      </div>
      <div style={{ ...mPad, paddingTop: 56, paddingBottom: 16 }}>
        <SectionLabel style={{ marginBottom: 14 }}>Les prestations</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 29, maxWidth: '16ch' }}>Cinq univers, un même soin du détail</h2>
      </div>
      <div style={{ ...mPad, display: 'grid', gap: 44, paddingTop: 32, paddingBottom: 56 }}>
        {B.univers.map((u) => (
          <UniverseCard key={u.title} index={u.index} title={u.title} line={u.line} image={img(u.image)} ratio="3 / 2" />
        ))}
      </div>
      <div style={{ ...mPad, paddingBottom: 56 }}>
        <SectionLabel style={{ marginBottom: 12 }}>@beautygreeninstitut</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 29, marginBottom: 20 }}>L'univers Beauty Green</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {['institut-cabine.jpeg', 'prestation-rehaussement-cils.jpeg', 'institut-accueil-logo-mural.jpeg', 'prestation-brow-lift.jpeg', 'institut-devanture.jpeg', 'prestation-blanchiment-dentaire-avant-apres.jpeg'].map((s) => (
            <div key={s} style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}><img src={img(s)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          ))}
        </div>
      </div>
      <SiteFooter compact logoSrc={logoSrcFor('ecru')} />
    </div>
  );
}

function ElectrolyseMobile() {
  const d = window.BG.electrolyse;
  return (
    <div>
      <div style={{ ...mPad, paddingTop: 36, paddingBottom: 28 }}>
        <SectionLabel style={{ marginBottom: 16 }}>{d.label}</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 37, lineHeight: 1.08 }}>{d.h1}</h1>
        <p style={{ marginTop: 18, fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontSize: 20, lineHeight: 1.55, color: 'var(--brun-80)' }}>{d.accroche}</p>
      </div>
      <div style={{ height: 260, overflow: 'hidden' }}><img src={img('institut-cabine.jpeg')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      <div style={{ ...mPad, paddingTop: 40, paddingBottom: 36 }}>
        <SectionLabel style={{ marginBottom: 14 }}>Qu'est-ce que c'est</SectionLabel>
        <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 23, lineHeight: 1.5 }}>{d.quoi}</p>
        <p style={{ marginTop: 20, fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--brun-80)' }}>{d.quoi2}</p>
      </div>
      <div style={{ ...mPad, paddingBottom: 40 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 }}>Zones traitées</p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: 'var(--border-hairline)' }}>
          {d.zones.map((z) => <li key={z} style={{ padding: '13px 0', borderBottom: 'var(--border-hairline)', fontFamily: 'var(--font-sans)', fontSize: 15 }}>{z}</li>)}
        </ul>
      </div>
      <div style={{ ...mPad, paddingTop: 36, paddingBottom: 36, background: 'var(--surface-raised)', borderTop: '1px solid var(--line-accent)', borderBottom: '1px solid var(--line-accent)' }}>
        <SectionLabel style={{ marginBottom: 12 }}>À savoir</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 27 }}>{d.bilan.titre}</h2>
        <p style={{ marginTop: 14, fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--brun-80)' }}>{d.bilan.texte}</p>
        <p style={{ marginTop: 18, fontFamily: 'var(--font-sans)', fontSize: 34 }}>{d.bilan.prix}</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)' }}>{d.bilan.mention}</p>
      </div>
      <div style={{ ...mPad, paddingTop: 44, paddingBottom: 44 }}>
        <SectionLabel style={{ marginBottom: 18 }}>Tarifs</SectionLabel>
        <PriceTable dense items={d.tarifs} note="Le rythme des séances se définit ensemble, au fil du suivi." />
      </div>
      <PrecautionsBlock items={d.precautions.slice(0, 4)} footnote={d.footnote} />
      <div style={{ ...mPad, paddingTop: 44, paddingBottom: 44 }}>
        <SectionLabel style={{ marginBottom: 18 }}>Questions fréquentes</SectionLabel>
        <FaqAccordion items={d.faq.slice(0, 4)} defaultOpen={-1} />
      </div>
      <SiteFooter compact logoSrc={logoSrcFor('ecru')} />
    </div>
  );
}

Object.assign(window, { MobileFrame, HomeMobile, ElectrolyseMobile });
