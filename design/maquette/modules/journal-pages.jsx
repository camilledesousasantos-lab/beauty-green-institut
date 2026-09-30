function JournalPage({ go }) {
  const [filtre, setFiltre] = React.useState('Tous');
  const cats = ['Tous', 'Électrolyse', 'Soins visage', 'Cils', 'Sourcils', 'Blanchiment dentaire'];
  const list = window.BG.articles.filter((a) => filtre === 'Tous' || a.category === filtre);
  return (
    <div>
      <Section py={0} style={{ paddingTop: 112 }}>
        <Container>
          <SectionLabel style={{ marginBottom: 24 }}>Journal</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', maxWidth: '16ch' }}>Comprendre les soins, avant et après</h1>
        </Container>
      </Section>

      <Section py={64}>
        <Container>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', borderBottom: 'var(--border-hairline)', paddingBottom: 28 }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setFiltre(c)}
                style={{ padding: '10px 20px', minHeight: 40, cursor: 'pointer', background: filtre === c ? 'var(--surface-inverse)' : 'transparent', color: filtre === c ? 'var(--bg-ecru)' : 'var(--brun-80)', border: `1px solid ${filtre === c ? 'var(--surface-inverse)' : 'var(--line-hairline)'}`, borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.06em' }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: 32, rowGap: 64 }}>
            {list.map((a) => (
              <div key={a.title} onClick={() => go('article.html')}>
                <ArticleCard category={a.category} date={a.date} title={a.title} image={img(a.image)} href="article.html" />
              </div>
            ))}
          </div>
          {list.length === 0 ? <p style={{ marginTop: 56, fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontStyle: 'italic', color: 'var(--text-secondary)' }}>Aucun article dans cet univers pour le moment.</p> : null}
        </Container>
      </Section>
      <CtaFinal title="Une question ? Parlons-en au rendez-vous" line="Les articles du Journal complètent, mais ne remplacent pas, le bilan en cabine." />
    </div>
  );
}

function ArticlePage({ go }) {
  return (
    <div>
      <Section py={0} style={{ paddingTop: 96 }}>
        <Container width={900} style={{ padding: '0 80px' }}>
          <SectionLabel style={{ marginBottom: 20 }}>Électrolyse · 5 février 2026</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 50, lineHeight: 1.1, maxWidth: '18ch' }}>Électrolyse ou laser : quelles différences ?</h1>
          <Lede style={{ marginTop: 26, maxWidth: '60ch' }}>
            Les deux méthodes reviennent souvent dans la même question. Elles ne traitent pourtant ni les mêmes poils, ni de la même façon. Voici comment je les explique en cabine.
          </Lede>
        </Container>
      </Section>

      <Section py={56}>
        <Container>
          <Photo src="prestation-electrolyse-menton.jpeg" ratio="16 / 9" objectPosition="center 40%" />
          <Caption>Repousses sur le menton avant une séance d'électrolyse.</Caption>
        </Container>
      </Section>

      <Section py={40}>
        <Container width={900} style={{ padding: '0 80px' }}>
          <div style={{ maxWidth: '65ch', display: 'grid', gap: 24 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.75, color: 'var(--brun-80)' }}>
              Le laser cible la mélanine, le pigment qui donne sa couleur au poil. Il fonctionne donc surtout sur des poils foncés, sur une peau claire, et perd en efficacité sur les poils blancs, blonds ou roux.
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 33, marginTop: 16 }}>Une approche poil par poil</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.75, color: 'var(--brun-80)' }}>
              L'électrolyse ne dépend pas de la couleur. Un filament très fin est glissé le long du poil, puis une impulsion courte agit à la base. Le travail est plus long, mais il s'adresse à tous les types de poils, des plus fins aux plus épais.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.75, color: 'var(--brun-80)' }}>
              Dans la pratique, les deux méthodes se complètent souvent : le laser dégrossit une zone dense, l'électrolyse prend le relais sur ce qu'il laisse — repousses claires, poils isolés, contours du visage.
            </p>
            <blockquote style={{ margin: '20px 0', paddingLeft: 28, borderLeft: '1px solid var(--line-accent)', fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontStyle: 'italic', fontSize: 24, lineHeight: 1.55, color: 'var(--text-primary)' }}>
              On ne choisit pas une méthode dans l'absolu : on regarde la zone, le poil et la peau, puis on décide ensemble.
            </blockquote>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.75, color: 'var(--brun-80)' }}>
              Le poil pousse par cycles, ce qui explique la répétition des séances dans les deux cas. Aucun nombre ne peut être annoncé à l'avance : il dépend de la zone, du terrain hormonal et de la régularité du suivi.
            </p>
          </div>

          <div style={{ marginTop: 56, background: 'var(--surface-muted)', padding: '40px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, maxWidth: 740 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 28 }}>En parler en rendez-vous</h3>
              <p style={{ marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--brun-80)', maxWidth: '34ch' }}>
                Le bilan comprend une consultation et quinze minutes de séance offertes — 45 €.
              </p>
            </div>
            <Button variant="primary" href={window.BG.planity}>Prendre rendez-vous</Button>
          </div>
        </Container>
      </Section>

      <Section py={112} tone="blanc">
        <Container>
          <SectionLabel style={{ marginBottom: 32 }}>Articles liés</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {window.BG.articles.slice(0, 3).map((a) => (
              <div key={a.title} onClick={() => go('article.html')}>
                <ArticleCard category={a.category} date={a.date} title={a.title} image={img(a.image)} href="article.html" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

Object.assign(window, { JournalPage, ArticlePage });
