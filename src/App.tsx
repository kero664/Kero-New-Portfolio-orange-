import {useEffect,useState} from 'react';
import {ArrowDown,ArrowUpRight,Code2,Command,Instagram,Mail,Menu,Volume2,VolumeX,X,Play,Settings2,Layers,Send} from 'lucide-react';
import {supabase} from './supabase';
const initial={name:'Kero',role:'DEVELOPER & DIGITAL CREATOR',headline:'I DON’T JUST',highlight:'BUILD.',about:'I build digital experiences with a strong visual identity, thoughtful interactions, and details that feel alive.',email:'hello@kero.dev',avatar_url:'',music_url:'',volume:0.28,skills:['React','TypeScript','UI / UX','Motion Design','Node.js','Creative Coding'],projects:[{title:'Digital Systems',category:'WEB EXPERIENCE',description:'A modern digital experience built around clarity, motion and a distinctive visual language.',image_url:'',link:'#'},{title:'Creative Interface',category:'INTERACTIVE DESIGN',description:'An expressive interface where thoughtful details make the whole experience feel premium.',image_url:'',link:'#'},{title:'Personal Platform',category:'PORTFOLIO / BRAND',description:'A flexible personal platform designed to evolve with new work and ideas.',image_url:'',link:'#'}],certificates:[{title:'Professional Certificate',issuer:'Add your certificate details',image_url:''},{title:'Learning & Development',issuer:'Add your certificate details',image_url:''}]};
type Content=typeof initial;
export default function App(){const [c,setC]=useState<Content>(initial);const [entered,setEntered]=useState(false);const [muted,setMuted]=useState(false);const [mobile,setMobile]=useState(false);const [loading,setLoading]=useState(true);const [playing,setPlaying]=useState(false);
useEffect(()=>{(async()=>{if(supabase){try{const {data}=await supabase.from('site_content').select('content').eq('id',1).maybeSingle();if(data?.content)setC({...initial,...data.content});}catch(e){console.warn(e)}}setLoading(false)})();},[]);
useEffect(()=>{if(!entered)return;const nodes=Array.from(document.querySelectorAll('.section, .hero-copy > *, .portrait-wrap, .service-card, .project-card, .certificate, .skill-pill, .manifesto-side')) as HTMLElement[];nodes.forEach((el,i)=>{if(!el.classList.contains('reveal')){el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${Math.min(i%5,4)*75}ms`)}});const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});nodes.forEach(el=>io.observe(el));const portrait=document.querySelector('.portrait-wrap') as HTMLElement|null;const move=(e:PointerEvent)=>{if(!portrait||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=portrait.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;portrait.style.setProperty('--tilt-x',`${-y*7}deg`);portrait.style.setProperty('--tilt-y',`${x*9}deg`)};const reset=()=>{portrait?.style.setProperty('--tilt-x','0deg');portrait?.style.setProperty('--tilt-y','0deg')};portrait?.addEventListener('pointermove',move);portrait?.addEventListener('pointerleave',reset);return()=>{io.disconnect();portrait?.removeEventListener('pointermove',move);portrait?.removeEventListener('pointerleave',reset)}},[entered]);


useEffect(() => {
  const audio = document.getElementById('bgmusic') as HTMLAudioElement | null;

  if (!audio || !c.music_url) {
    setPlaying(false);
    return;
  }

  audio.volume = muted ? 0 : Number(c.volume ?? 0.28);

  if (!entered) return;

  let active = true;

  audio.play()
    .then(() => {
      if (active) setPlaying(true);
    })
    .catch(() => {
      if (active) setPlaying(false);
    });

  return () => {
    active = false;
  };
}, [entered, c.music_url, c.volume, muted]);

useEffect(() => {
  const timer = window.setTimeout(() => {
    setEntered(true);
    document.getElementById('home')?.scrollIntoView({
      behavior: 'smooth'
    });
  }, 6500);

  return () => window.clearTimeout(timer);
}, []);

const enter = () => {
  setEntered(true);

  window.setTimeout(() => {
    document.getElementById('home')?.scrollIntoView({
      behavior: 'smooth'
    });
  }, 80);
};



return <><audio id="bgmusic" src={c.music_url||undefined} loop/><div className="grain"/><div className="orb orb1"/><div className="orb orb2"/>
{!entered&&<div className="intro"><div className="intro-mark"><span className="mark-symbol">K</span><span className="mark-line"/></div><div className="intro-word">KERO<span>.</span></div><div className="intro-sub">DIGITAL PORTFOLIO <i/></div><button className="enter" onClick={enter}><span>ENTER EXPERIENCE</span><ArrowUpRight size={17}/></button><div className="intro-foot"><span>DESIGN / DEVELOP / CREATE</span><span>SCROLL TO EXPLORE ↓</span></div></div>}
<header className={'topbar '+(entered?'visible':'')}><a className="brand" href="#home"><span className="brand-k">K</span><span>KERO<span className="orange">.</span></span></a><nav className={mobile?'nav open':'nav'}>{[['Home','#home'],['About','#about'],['Services','#services'],['Projects','#projects'],['Certificates','#certificates'],['Contact','#contact']].map(([t,h])=><a key={h} href={h} onClick={()=>setMobile(false)}>{t}</a>)}</nav><div className="nav-right"><a className="hire" href="#contact">LET’S TALK <ArrowUpRight size={14}/></a><button className="icon-btn menu-btn" onClick={()=>setMobile(!mobile)} aria-label="Toggle menu">{mobile?<X/>:<Menu/>}</button></div></header>
<main className={entered?'site entered':'site'}>
<section className="hero section" id="home"><div className="hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> AVAILABLE FOR SELECT PROJECTS</div><p className="hero-kicker">HELLO, I’M {c.name.toUpperCase()}</p><h1>{c.headline}<br/><span>{c.highlight}</span></h1><p className="hero-desc">{c.role} — {c.about}</p><div className="hero-actions"><a className="button-primary" href="#projects">EXPLORE MY WORK <ArrowUpRight size={17}/></a><a className="button-quiet" href="#about">MORE ABOUT ME <ArrowDown size={15}/></a></div><div className="hero-meta"><span><b>01</b> / CREATIVE DEVELOPER</span><span>BASED IN EGYPT <i className="tiny-star">✳</i></span></div></div><div className="portrait-wrap"><div className="portrait-frame"><div className="portrait-scan"/><div className="portrait-content">{c.avatar_url?<img src={c.avatar_url} alt={c.name}/>:<div className="avatar-placeholder"><div className="avatar-ring"><Command size={54}/></div><span>YOUR PHOTO GOES HERE</span></div>}<div className="portrait-label"><span>FIG. 001</span><span>{c.name.toUpperCase()} / 2026</span></div></div></div><div className="floating-tag tag-top">CREATIVE<br/><b>BY DESIGN</b></div><div className="floating-tag tag-bottom"><span className="mini-dot"/> ALWAYS BUILDING</div><div className="circle-stamp">KERO<br/>® 2026</div></div></div><a href="#about" className="scroll-cue"><span className="scroll-line"/> SCROLL TO DISCOVER</a><div className="hero-index">01 — 06</div></section>
<section className="manifesto section" id="about"><div className="section-head"><span className="section-num">01 / ABOUT</span><span className="section-note">A LITTLE ABOUT WHAT I DO</span></div><div className="manifesto-layout"><h2>I DON’T JUST<br/><span>BUILD</span> WEBSITES.<br/>I BUILD <em>FEELING.</em></h2><div className="manifesto-side"><span className="cross">✳</span><p>{c.about}</p><a href="#contact" className="text-link">LET’S MAKE SOMETHING MATTER <ArrowUpRight size={16}/></a></div></div><div className="ticker"><div>DESIGN WITH INTENT <b>✳</b> BUILD WITH PURPOSE <b>✳</b> DETAILS MATTER <b>✳</b> DESIGN WITH INTENT <b>✳</b> BUILD WITH PURPOSE <b>✳</b></div></div></section>
<section className="services section" id="services"><div className="section-head"><span className="section-num">02 / CAPABILITIES</span><span className="section-note">WHAT I BRING TO THE TABLE</span></div><h2 className="section-title">DIGITAL <span>SYSTEMS.</span></h2><p className="section-intro">From the first sketch to the final interaction, every detail has a purpose.</p><div className="service-grid"><article className="service-card"><span className="card-no">01</span><div className="service-icon"><Layers/></div><h3>INTERFACE<br/>DESIGN</h3><p>Clear, confident interfaces with a visual system built to stand out.</p><span className="card-arrow"><ArrowUpRight/></span></article><article className="service-card featured"><span className="card-no">02</span><div className="service-icon"><Code2/></div><h3>WEB<br/>DEVELOPMENT</h3><p>Responsive, accessible websites with polished interactions and performance.</p><span className="card-arrow"><ArrowUpRight/></span></article><article className="service-card"><span className="card-no">03</span><div className="service-icon"><Command/></div><h3>MOTION &<br/>EXPERIENCE</h3><p>Small moments of movement that make digital products feel alive.</p><span className="card-arrow"><ArrowUpRight/></span></article></div></section>
<section className="projects section" id="projects"><div className="section-head"><span className="section-num">03 / SELECTED WORK</span><span className="section-note">A FEW THINGS I’VE MADE</span></div><div className="title-row"><h2 className="section-title">SELECTED <span>PROJECTS.</span></h2><span className="work-count">({String(c.projects.length).padStart(2,'0')})</span></div><div className="project-grid">{c.projects.map((p,i)=><a className="project-card" href={p.link||'#'} key={p.title+i} target={p.link?.startsWith('http')?'_blank':undefined} rel="noreferrer"><div className={'project-art art-'+i%3}>{p.image_url?<img src={p.image_url} alt={p.title}/>:<div className="art-abstract"><div className="art-ring"/><div className="art-letters">{p.title.split(' ').map(x=>x[0]).join('').slice(0,3)}</div><span>PROJECT / {String(i+1).padStart(2,'0')}</span></div>}<span className="project-open"><ArrowUpRight/></span></div><div className="project-info"><div><span className="project-cat">{p.category}</span><h3>{p.title}</h3></div><span className="project-index">0{i+1}</span></div><p className="project-desc">{p.description}</p></a>)}</div></section>
<section className="skills section"><div className="section-head"><span className="section-num">04 / TOOLKIT</span><span className="section-note">TOOLS OF THE TRADE</span></div><div className="skills-layout"><h2 className="section-title">BUILT WITH<br/><span>INTENTION.</span></h2><div className="skills-list">{c.skills.map((s,i)=><span className="skill-pill" key={s}><small>0{i+1}</small>{s}<ArrowUpRight size={14}/></span>)}</div></div></section>
<section className="certificates section" id="certificates"><div className="section-head"><span className="section-num">05 / MILESTONES</span><span className="section-note">LEARNING NEVER STOPS</span></div><div className="title-row"><h2 className="section-title">MY <span>CERTIFICATES.</span></h2><span className="work-count">{String(c.certificates.length).padStart(2,'0')} ITEMS</span></div><div className="certificate-grid">{c.certificates.map((cert,i)=><div className="certificate" key={cert.title+i}>{cert.image_url?<img src={cert.image_url} alt={cert.title}/>:<div className="cert-placeholder"><span>✳</span><b>KERO / VERIFIED</b><small>CERTIFICATE {String(i+1).padStart(2,'0')}</small></div>}<div className="cert-meta"><div><h3>{cert.title}</h3><p>{cert.issuer}</p></div><ArrowUpRight size={18}/></div></div>)}</div></section>
<section className="contact section" id="contact"><div className="section-head"><span className="section-num">06 / CONTACT</span><span className="section-note">GOOD THINGS START WITH A HELLO</span></div><div className="contact-layout"><div><p className="contact-kicker">HAVE A GOOD ONE IN MIND?</p><h2>LET’S WORK<br/><span>TOGETHER.</span></h2><p className="contact-desc">Have a project, an idea, or just want to say hello? My inbox is open.</p><a className="button-primary" href={'mailto:'+c.email}>START A CONVERSATION <Send size={16}/></a></div><div className="contact-links"><a href={'mailto:'+c.email}><span><Mail/> EMAIL</span><b>{c.email}</b><ArrowUpRight/></a><a href="#home"><span><Instagram/> SOCIALS</span><b>LET’S CONNECT</b><ArrowUpRight/></a></div></div><footer><a className="brand" href="#home"><span className="brand-k">K</span><span>KERO<span className="orange">.</span></span></a><span>DESIGNED WITH INTENT. BUILT WITH PURPOSE.</span><span>© KERO 2026</span></footer></section>
</main>{entered&&<div className="sound-control"><button className="icon-btn" onClick={()=>setMuted(!muted)} aria-label="Toggle music">{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button><span>{muted?'SOUND OFF':playing?'SOUND ON':'SOUND READY'}</span><i className={muted?'sound-bars paused':'sound-bars'}><b/><b/><b/><b/></i></div>}<a className="admin-shortcut" href="/admin" title="Admin panel"><Settings2 size={15}/></a></>}
