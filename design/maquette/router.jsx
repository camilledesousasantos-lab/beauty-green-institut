function Site(){
  const [page,setPage]=React.useState(location.hash.slice(1)||'index.html');
  const go=(href)=>{setPage(href);location.hash=href;window.scrollTo(0,0);};
  React.useEffect(()=>{const f=()=>setPage(location.hash.slice(1)||'index.html');window.addEventListener('hashchange',f);return ()=>window.removeEventListener('hashchange',f);},[]);
  // Délégation globale : tout lien interne .html est intercepté, depuis n'importe quelle vue.
  React.useEffect(()=>{
    const onClick=(e)=>{
      const a=e.target.closest && e.target.closest('a[href]');
      if(!a) return;
      const raw=a.getAttribute('href');
      if(!raw||raw.startsWith('http')||raw.startsWith('tel:')||raw.startsWith('mailto:')) return;
      if(raw==='#') { e.preventDefault(); return; }
      const target=raw.replace(/^#/,'');
      if(!/\.html$/.test(target)) return;
      e.preventDefault();
      go(target);
    };
    document.addEventListener('click',onClick,true);
    return ()=>document.removeEventListener('click',onClick,true);
  },[]);
  const B=window.BG;
  let body;
  switch(page){
    case 'electrolyse.html': body=<PrestationPage data={B.electrolyse} go={go} image="institut-cabine.jpeg" proof="prestation-electrolyse-menton.jpeg" proofCaption="Repousses sur le menton avant une séance." tarifsTitle="Des séances à la durée" tarifsNote="Le bilan du premier rendez-vous comprend la consultation et quinze minutes de séance offertes — 45 €."/>; break;
    case 'sourcils.html': body=<PrestationPage data={B.sourcils} go={go} image="prestation-brow-lift.jpeg" tarifsTitle="Prestations et combinaisons" tarifsNote="Les prestations se combinent : la teinture seule ne comprend pas la restructuration."/>; break;
    case 'blanchiment.html': body=<PrestationPage data={B.blanchiment} go={go} image="prestation-blanchiment-dentaire-avant-apres.jpeg" tarifsTitle="Séances et tarifs" tarifsNote="La deuxième séance n'est possible que dans les quatre semaines suivant la première."/>; break;
    case 'soins-visage.html': body=<PrestationPage data={B.soinsVisage} go={go} image="institut-cabine.jpeg" tarifsTitle="Les trois soins"/>; break;
    case 'cils.html': body=<PrestationPage data={B.cils} go={go} image="prestation-rehaussement-cils.jpeg" tarifsTitle="Rehaussement et teinture"/>; break;
    case 'prestations.html': body=<PrestationsIndex go={go}/>; break;
    case 'institut.html': body=<InstitutPage go={go}/>; break;
    case 'cheques-cadeaux.html': body=<CadeauxPage/>; break;
    case 'journal.html': body=<JournalPage go={go}/>; break;
    case 'article.html': body=<ArticlePage go={go}/>; break;
    case 'formations.html': body=<FormationsPage/>; break;
    default: body=<HomeDesktop go={go}/>;
  }
  return <div>
    <SiteHeader current={page} logoSrc={logoSrcFor('brun')} onNavigate={go}/>
    {body}
    <SiteFooter logoSrc={logoSrcFor('ecru')}/>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Site/>);
