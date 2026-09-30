function InfoBlocs({ items, columns = 4 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns},1fr)`, gap: 40, borderTop: 'var(--border-hairline)', paddingTop: 40 }}>
      {items.map((b) => (
        <div key={b.t}>
          <h3 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 24, marginBottom: 14 }}>{b.t}</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.7, color: 'var(--brun-80)' }}>{b.d}</p>
        </div>
      ))}
    </div>
  );
}

function BilanBlock({ bilan }) {
  return (
    <Section tone="blanc" py={96}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 80, alignItems: 'center', border: '1px solid var(--line-accent)', padding: '56px 56px' }}>
          <div>
            <SectionLabel style={{ marginBottom: 18 }}>À savoir</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 37, marginBottom: 20 }}>{bilan.titre}</h2>
            <Body>{bilan.texte}</Body>
          </div>
          <div style={{ textAlign: 'right', borderLeft: 'var(--border-hairline)', paddingLeft: 56 }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 44, fontWeight: 400, color: 'var(--text-primary)' }}>{bilan.prix}</span>
            <span style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-secondary)', maxWidth: '22ch' }}>{bilan.mention}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PrestationPage({ data, go, image, imagePosition, proof, proofCaption, tarifsNote, tarifsTitle }) {
  return (
    <div>
      <PageHeader label={data.label} h1={data.h1} accroche={data.accroche} image={image} imagePosition={imagePosition} />

      <Section py={120}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <div>
              <SectionLabel style={{ marginBottom: 18 }}>Qu'est-ce que c'est</SectionLabel>
              {data.zones ? (
                <div style={{ marginTop: 36 }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>Zones traitées</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: 'var(--border-hairline)' }}>
                    {data.zones.map((z) => (
                      <li key={z} style={{ padding: '11px 0', borderBottom: 'var(--border-hairline)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)' }}>{z}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {proof ? (
                <div style={{ marginTop: 40, maxWidth: 240 }}>
                  <Photo src={proof} ratio="1 / 1" />
                  <Caption>{proofCaption}</Caption>
                </div>
              ) : null}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, fontSize: 29, lineHeight: 1.5, color: 'var(--text-primary)', maxWidth: '40ch' }}>
                {data.quoi || data.intro}
              </p>
              {data.quoi2 ? <Body style={{ marginTop: 32 }}>{data.quoi2}</Body> : null}
              {data.options ? <div style={{ marginTop: 48 }}><InfoBlocs items={data.options} columns={3} /></div> : null}
              {data.blocs ? <div style={{ marginTop: 56 }}><InfoBlocs items={data.blocs} columns={2} /></div> : null}
            </div>
          </div>
        </Container>
      </Section>

      {data.bilan ? <BilanBlock bilan={data.bilan} /> : null}

      <Section py={120} id="tarifs">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <div>
              <SectionLabel style={{ marginBottom: 18 }}>Tarifs</SectionLabel>
              <H2 style={{ fontSize: 30 }}>{tarifsTitle || 'Les tarifs'}</H2>
            </div>
            <div>
              <PriceTable items={data.tarifs} dense={data.tarifs.length > 5} note={tarifsNote} />
              <div style={{ marginTop: 40 }}>
                <Button variant="primary" href={window.BG.planity}>Prendre rendez-vous</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {data.apres ? (
        <Section py={0}>
          <Container>
            <div style={{ display: 'grid', gridTemplateColumns: '220px repeat(3,1fr)', gap: 32, borderTop: 'var(--border-hairline)', paddingTop: 40, paddingBottom: 96 }}>
              <SectionLabel>Les 24 heures qui suivent</SectionLabel>
              {data.apres.map((a, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.7, color: 'var(--brun-80)' }}>{a}</p>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Container>
        <PrecautionsBlock intro={data.precautionsIntro} items={data.precautions} footnote={data.footnote} />
      </Container>

      <Section py={120}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <div>
              <SectionLabel style={{ marginBottom: 18 }}>Questions fréquentes</SectionLabel>
              <H2 style={{ fontSize: 30 }}>Ce qu'on me demande souvent</H2>
            </div>
            <FaqAccordion items={data.faq} />
          </div>
        </Container>
      </Section>

      <CtaFinal title={`${data.label} — prendre rendez-vous`} line="Réservation en ligne sur Planity, à l'institut, 8 rue Anatole France à Rouen." />
      <UniversLinks current={data.label} go={go} />
    </div>
  );
}

Object.assign(window, { PrestationPage, InfoBlocs, BilanBlock });
