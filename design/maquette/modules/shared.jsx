const DS = window.BeautyGreenInstitutDesignSystem_0a6d39;
const { Button, Logo, SectionLabel, ImagePlaceholder, UniverseCard, ArticleCard, PriceTable, PrecautionsBlock, FaqAccordion, SiteHeader, SiteFooter, MobileMenu, InstagramGrid } = DS;
// Les images sont embarquées en data-URI (images.js) pour survivre à la publication.
// img('institut-cabine.jpeg') et logoSrcFor('brun') remplacent les anciens chemins relatifs.
const img = (f) => window.bgPhoto(String(f).replace(/^.*\//, ''));
const logoSrcFor = (tone) => window.bgLogo(String(tone).replace(/\.png$/, ''));

function Container({ children, width = 1280, style }) {
  return <div style={{ maxWidth: width, margin: '0 auto', padding: '0 80px', ...style }}>{children}</div>;
}

function Section({ children, tone, py = 128, style, id }) {
  const bg = tone === 'beige' ? 'var(--surface-muted)' : tone === 'blanc' ? 'var(--surface-raised)' : tone === 'brun' ? 'var(--surface-inverse)' : 'transparent';
  return <section id={id} style={{ background: bg, padding: `${py}px 0`, ...style }}>{children}</section>;
}

function Lede({ children, size = 'var(--fs-lede)', style }) {
  return <p style={{ fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontSize: size, lineHeight: 'var(--lh-lede)', color: 'var(--brun-80)', maxWidth: '54ch', ...style }}>{children}</p>;
}

function Body({ children, style }) {
  return <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--brun-80)', maxWidth: '62ch', ...style }}>{children}</p>;
}

function H2({ children, style }) {
  return <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 'var(--fs-h2)', lineHeight: 'var(--lh-heading)', maxWidth: '20ch', ...style }}>{children}</h2>;
}

function Photo({ src, alt = '', ratio = '4 / 5', style, objectPosition }) {
  return (
    <div style={{ aspectRatio: ratio, overflow: 'hidden', background: 'var(--surface-muted)', ...style }}>
      <img src={img(src)} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition }} />
    </div>
  );
}

function Caption({ children }) {
  return <p style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-secondary)' }}>{children}</p>;
}

function CtaFinal({ title = 'Prendre rendez-vous', line }) {
  return (
    <Section tone="brun" py={104}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <SectionLabel tone="ecru" style={{ opacity: 0.6, marginBottom: 20 }}>Réservation</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 'var(--fs-h2)', color: 'var(--bg-ecru)', maxWidth: '16ch' }}>{title}</h2>
            {line ? <p style={{ marginTop: 20, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--bg-ecru)', opacity: 0.75, maxWidth: '44ch' }}>{line}</p> : null}
            <div style={{ marginTop: 36 }}>
              <a href={window.BG.planity} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 56, padding: '0 40px', background: 'var(--bg-ecru)', color: 'var(--bg-brun)', fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: 'var(--ls-button)', textTransform: 'uppercase' }}>
                Prendre rendez-vous sur Planity
              </a>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 14, color: 'var(--bg-ecru)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', opacity: 0.8, paddingBottom: 6 }}>
            <span>{window.BG.adresse}</span>
            <span>{window.BG.horaires}</span>
            <span>{window.BG.tel}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function UniversLinks({ current, go }) {
  const others = window.BG.univers.filter((u) => u.title !== current);
  return (
    <Section py={96}>
      <Container>
        <SectionLabel style={{ marginBottom: 28 }}>Les autres univers</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${others.length},1fr)`, gap: 0, borderTop: 'var(--border-hairline)' }}>
          {others.map((u) => (
            <a key={u.title} href={u.href} onClick={(e) => { e.preventDefault(); go(u.href); }}
              style={{ padding: '30px 24px 30px 0', borderBottom: 'var(--border-hairline)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-label)', letterSpacing: 'var(--ls-label)', color: 'var(--text-accent)' }}>{u.index}</span>
              <span style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 24 }}>{u.title}</span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PageHeader({ label, h1, accroche, image, imagePosition }) {
  return (
    <Section py={0} style={{ paddingTop: 96 }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <SectionLabel style={{ marginBottom: 24 }}>{label}</SectionLabel>
            <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', lineHeight: 1.08, maxWidth: '12ch' }}>{h1}</h1>
            <Lede style={{ marginTop: 28 }}>{accroche}</Lede>
            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              <Button variant="primary" href={window.BG.planity}>Prendre rendez-vous</Button>
            </div>
          </div>
          {image ? <Photo src={image} ratio="5 / 4" objectPosition={imagePosition} /> : null}
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { img, logoSrcFor, DS, Button, Logo, SectionLabel, ImagePlaceholder, UniverseCard, ArticleCard, PriceTable, PrecautionsBlock, FaqAccordion, SiteHeader, SiteFooter, MobileMenu, InstagramGrid, Container, Section, Lede, Body, H2, Photo, Caption, CtaFinal, UniversLinks, PageHeader });
