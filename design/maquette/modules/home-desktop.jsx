function HomeHero({ go }) {
  return (
    <section style={{ position: 'relative', minHeight: 760, display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--surface-muted)' }}>
      <img src={img('institut-devanture.jpeg')} alt="La devanture de Beauty Green Institut, 8 rue Anatole France à Rouen"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% 45%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(243,239,232,.97) 0%, rgba(243,239,232,.96) 52%, rgba(243,239,232,.5) 63%, rgba(243,239,232,0) 75%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 160, background: 'linear-gradient(180deg, rgba(243,239,232,0), rgba(243,239,232,.55))' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 1280, margin: '0 auto', padding: '120px 80px 120px' }}>
        <SectionLabel tone="brun" style={{ marginBottom: 28 }}>{window.BG.home.label}</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 84, lineHeight: 1.02, letterSpacing: 'var(--ls-display)', color: 'var(--text-primary)' }}>
          Beauty Green<br />Institut
        </h1>
        <p style={{ marginTop: 32, fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontStyle: 'italic', fontSize: 25, color: 'var(--brun-80)', maxWidth: '30ch' }}>
          {window.BG.home.accroche}
        </p>
        <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" href={window.BG.planity}>Prendre rendez-vous</Button>
          <Button variant="secondary" size="lg" href="institut.html" onClick={(e) => { e.preventDefault(); go('institut.html'); }}>Découvrir l'institut</Button>
        </div>
      </div>
      <span style={{ position: 'absolute', right: 40, bottom: 28, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
        8 rue Anatole France, Rouen
      </span>
    </section>
  );
}

function HomeIntro() {
  return (
    <Section py={144}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <SectionLabel>Bienvenue</SectionLabel>
          <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 34, lineHeight: 1.45, color: 'var(--text-primary)', maxWidth: '38ch' }}>
            {window.BG.home.intro}
          </p>
        </div>
      </Container>
    </Section>
  );
}

function HomeUnivers({ go }) {
  const u = window.BG.univers;
  const nav = (href) => (e) => { e.preventDefault(); go(href); };
  return (
    <Section tone="blanc" py={128}>
      <Container>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
          <div>
            <SectionLabel style={{ marginBottom: 18 }}>Les prestations</SectionLabel>
            <H2>Cinq univers, un même soin du détail</H2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: 32, rowGap: 72 }}>
          {u.slice(0, 3).map((x) => (
            <div key={x.title} onClick={nav(x.href)}>
              <UniverseCard index={x.index} title={x.title} line={x.line} image={img(x.image)} href={x.href} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 12, borderBottom: 'var(--border-hairline)' }}>
            <p style={{ fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontSize: 20, lineHeight: 1.6, color: 'var(--brun-80)', maxWidth: '26ch' }}>
              Chaque prestation a sa page : déroulement, durée, tarifs et précautions.
            </p>
            <a href="prestations.html" onClick={nav('prestations.html')} style={{ marginTop: 20, alignSelf: 'flex-start', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--ls-button)', textTransform: 'uppercase', color: 'var(--text-accent)', borderBottom: '1px solid var(--line-accent)', paddingBottom: 3 }}>
              Toutes les prestations
            </a>
          </div>
          {u.slice(3).map((x) => (
            <div key={x.title} onClick={nav(x.href)}>
              <UniverseCard index={x.index} title={x.title} line={x.line} image={img(x.image)} href={x.href} ratio="4 / 5" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HomeInstitut({ go }) {
  return (
    <Section py={128}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          <Photo src="institut-accueil-logo-mural.jpeg" ratio="4 / 3" />
          <div>
            <SectionLabel style={{ marginBottom: 20 }}>L'institut</SectionLabel>
            <H2>Un lieu calme, rue Anatole France</H2>
            <Body style={{ marginTop: 26 }}>{window.BG.home.institut}</Body>
            <div style={{ marginTop: 36 }}>
              <Button variant="secondary" href="institut.html" onClick={(e) => { e.preventDefault(); go('institut.html'); }}>Découvrir l'institut</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HomeDesktop({ go }) {
  const shots = ['institut-cabine.jpeg', 'prestation-rehaussement-cils.jpeg', 'institut-accueil-logo-mural.jpeg', 'prestation-brow-lift.jpeg', 'institut-devanture.jpeg', 'prestation-blanchiment-dentaire-avant-apres.jpeg'].map((s) => img(s));
  return (
    <div>
      <HomeHero go={go} />
      <HomeIntro />
      <HomeUnivers go={go} />
      <HomeInstitut go={go} />
      <Section py={128} tone="blanc">
        <Container><InstagramGrid images={shots} /></Container>
      </Section>
    </div>
  );
}

Object.assign(window, { HomeDesktop });
