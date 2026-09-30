function InstitutPage({ go }) {
  const d = window.BG.institut;
  return (
    <div>
      <Section py={0} style={{ paddingTop: 96 }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
            <div>
              <SectionLabel style={{ marginBottom: 24 }}>{d.label}</SectionLabel>
              <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', lineHeight: 1.06, maxWidth: '13ch' }}>{d.h1}</h1>
            </div>
            <Photo src="institut-cabine.jpeg" ratio="16 / 10" />
          </div>
        </Container>
      </Section>

      <Section py={120}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <img src={img('camille-portrait.png')} alt="Camille, fondatrice" style={{ width: 150, height: 150, borderRadius: 'var(--radius-round)', objectFit: 'cover', objectPosition: 'center 30%' }} />
              <p style={{ marginTop: 18, fontFamily: 'var(--font-serif-text)', fontWeight: 500, fontStyle: 'italic', fontSize: 19 }}>{d.signature}</p>
            </div>
            <div style={{ display: 'grid', gap: 26, maxWidth: '58ch' }}>
              {d.texte.map((t, i) => (
                <p key={i} style={{ fontFamily: i === 0 ? 'var(--font-serif-display)' : 'var(--font-sans)', fontSize: i === 0 ? 26 : 'var(--fs-body)', lineHeight: i === 0 ? 1.5 : 'var(--lh-body)', color: i === 0 ? 'var(--text-primary)' : 'var(--brun-80)' }}>{t}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="beige" py={88}>
        <Container>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {d.valeurs.map((v) => (
              <span key={v} style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 31, color: 'var(--text-primary)' }}>{v}</span>
            ))}
          </div>
        </Container>
      </Section>

      <Section py={120}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <Photo src="institut-accueil-logo-mural.jpeg" ratio="4 / 3" />
            <Photo src="institut-devanture.jpeg" ratio="4 / 3" />
          </div>
        </Container>
      </Section>

      <Section tone="blanc" py={104}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, borderTop: 'var(--border-hairline)', paddingTop: 40 }}>
            {[['Adresse', window.BG.adresse], ['Horaires', 'Mardi à vendredi\n10h45 – 19h00\nSur rendez-vous'], ['Téléphone', window.BG.tel], ['Réservation', 'Uniquement sur Planity']].map(([t, v]) => (
              <div key={t}>
                <SectionLabel style={{ marginBottom: 14 }}>{t}</SectionLabel>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.7 }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
            <Button variant="primary" href={window.BG.planity}>Prendre rendez-vous</Button>
            <Button variant="secondary" href="https://maps.google.com/?q=8+rue+Anatole+France+76000+Rouen">Ouvrir dans Google Maps</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function CadeauxPage() {
  const d = window.BG.cadeaux;
  return (
    <div>
      <Section py={0} style={{ paddingTop: 112 }}>
        <Container>
          <SectionLabel style={{ marginBottom: 24 }}>{d.label}</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', maxWidth: '14ch' }}>{d.h1}</h1>
          <Lede style={{ marginTop: 28 }}>{d.intro}</Lede>
        </Container>
      </Section>

      <Section py={96}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <SectionLabel style={{ marginBottom: 22 }}>Montants</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {d.montants.map((m) => (
                  <span key={m} style={{ padding: '14px 26px', border: '1px solid var(--line-strong)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-price)', color: 'var(--text-primary)' }}>{m}</span>
                ))}
              </div>
              <p style={{ marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)', maxWidth: '42ch' }}>
                Valable un an, sur toutes les prestations, utilisable en plusieurs fois jusqu'à épuisement du solde.
              </p>
            </div>
            <div style={{ background: 'var(--surface-muted)', padding: '56px 56px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 33, marginBottom: 18 }}>Commander un chèque cadeau</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--brun-80)', maxWidth: '38ch' }}>{d.v1}</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" href={'tel:+33786668799'}>Appeler l'institut</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section py={0}>
        <Container>
          <div style={{ border: '1px dashed var(--line-strong)', padding: '44px 48px', marginBottom: 120, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
            <div>
              <SectionLabel style={{ marginBottom: 12 }}>Emplacement réservé — version 2</SectionLabel>
              <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 26, maxWidth: '34ch' }}>Achat en ligne : montant, bénéficiaire, message, paiement, envoi du PDF.</p>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)', maxWidth: '30ch' }}>{d.bientot}</p>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FormationsPage() {
  const d = window.BG.formations;
  return (
    <div>
      <Section py={0} style={{ paddingTop: 112 }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'end' }}>
            <div>
              <SectionLabel style={{ marginBottom: 24 }}>{d.label}</SectionLabel>
              <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', maxWidth: '14ch' }}>{d.h1}</h1>
              <p style={{ marginTop: 24, display: 'inline-block', padding: '10px 20px', background: 'var(--surface-muted)', fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{d.statut}</p>
              <Lede style={{ marginTop: 32 }}>{d.intro}</Lede>
            </div>
            <Photo src="prestation-rehaussement-cils.jpeg" ratio="1 / 1" />
          </div>
        </Container>
      </Section>

      <Section py={112}>
        <Container>
          <SectionLabel style={{ marginBottom: 28 }}>À venir sur cette page</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderTop: 'var(--border-hairline)' }}>
            {d.apreparer.concat(Array((4 - (d.apreparer.length % 4)) % 4).fill('')).map((x, i) => (
              <div key={i} style={{ padding: '26px 24px 26px 0', borderBottom: 'var(--border-hairline)', fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 23, color: 'var(--brun-60)' }}>{x}</div>
            ))}
          </div>
          <p style={{ marginTop: 48, fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 31 }}>{d.contact}</p>
          <p style={{ marginTop: 14, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-secondary)' }}>
            Pas d'inscription en ligne pour le moment.
          </p>
        </Container>
      </Section>
    </div>
  );
}

function PrestationsIndex({ go }) {
  return (
    <div>
      <Section py={0} style={{ paddingTop: 112 }}>
        <Container>
          <SectionLabel style={{ marginBottom: 24 }}>Prestations</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 600, fontSize: 'var(--fs-h1)', maxWidth: '16ch' }}>Cinq univers</h1>
          <Lede style={{ marginTop: 26 }}>Chaque univers a sa page : ce que c'est, pour qui, le déroulement, la durée, les tarifs et les précautions.</Lede>
        </Container>
      </Section>
      <Section py={96}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: 32, rowGap: 64 }}>
            {window.BG.univers.map((u) => (
              <div key={u.title} onClick={() => go(u.href)}>
                <UniverseCard index={u.index} title={u.title} line={u.line} image={img(u.image)} href={u.href} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <CtaFinal title="Prendre rendez-vous" line="Réservation en ligne sur Planity." />
    </div>
  );
}

Object.assign(window, { InstitutPage, CadeauxPage, FormationsPage, PrestationsIndex });
