function Mobiles(){return <div style={{display:'flex',gap:56,alignItems:'flex-start'}}>
  <MobileFrame label="Accueil — 390" current="index.html"><HomeMobile/></MobileFrame>
  <MobileFrame label="Électrolyse — 390" current="electrolyse.html"><ElectrolyseMobile/></MobileFrame>
</div>}
ReactDOM.createRoot(document.getElementById('root')).render(<Mobiles/>);
