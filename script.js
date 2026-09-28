document.addEventListener("DOMContentLoaded",()=>{
  const header=document.getElementById("header"), progress=document.getElementById("progress");
  const menu=document.getElementById("menuToggle"), nav=document.getElementById("nav");
  const glow=document.getElementById("cursorGlow");
  const year=document.getElementById("year");
  year.textContent=new Date().getFullYear();

  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menu.setAttribute("aria-expanded",open);
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");menu.setAttribute("aria-expanded","false");
  }));

  const updateScroll=()=>{
    const y=window.scrollY;
    header.classList.toggle("scrolled",y>20);
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(max>0?Math.min(100,y/max*100):0)+"%";
  };
  window.addEventListener("scroll",updateScroll,{passive:true}); updateScroll();

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  if(window.matchMedia("(pointer:fine)").matches){
    window.addEventListener("pointermove",e=>{
      glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";
    },{passive:true});
  }

  document.querySelectorAll(".project,.service,.price-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      if(!window.matchMedia("(pointer:fine)").matches)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty("--mx",(x*5).toFixed(2)+"deg");
      card.style.setProperty("--my",(y*-5).toFixed(2)+"deg");
    });
    card.addEventListener("pointerleave",()=>{card.style.setProperty("--mx","0deg");card.style.setProperty("--my","0deg")});
  });
});