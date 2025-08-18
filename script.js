// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scrolling (Lenis)
const lenis = new Lenis({
  duration: 1.1,   // feel of slight delay/inertia
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
  wheelMultiplier: 1.0
});
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP + ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Helper: split hero lines for stagger (simple split by <br/> already done)
const hero = document.querySelector(".hero-title");
if(hero){
  // Fade each line up
  const lines = hero.innerHTML.split("<br>");
  hero.innerHTML = lines.map(l => `<span class="line">${l}</span>`).join("<br>");
  gsap.set(".hero-title .line", {display:"inline-block", opacity:0, y:40});
  gsap.to(".hero-title .line", {
    opacity:1, y:0, duration:0.9, ease:"power3.out",
    stagger: 0.08,
    scrollTrigger:{
      trigger: hero,
      start: "top 80%",
      toggleActions: "play reverse play reverse" // replays when scrolling back
    }
  });
}

// Subtitle + email
gsap.from(".subtitle", {
  opacity:0, y:24, duration:0.8, ease:"power3.out",
  scrollTrigger:{ trigger: ".subtitle", start: "top 90%", toggleActions:"play reverse play reverse" }
});
gsap.from(".email", {
  opacity:0, y:16, duration:0.8,
  scrollTrigger:{ trigger: ".email", start: "top 95%", toggleActions:"play reverse play reverse" }
});

// About lead
gsap.from(".lead", {
  opacity:0, y:30, duration:0.9, ease:"power3.out",
  scrollTrigger:{ trigger: ".lead", start: "top 85%", toggleActions:"play reverse play reverse" }
});

// Wide feature parallax + reveal
document.querySelectorAll(".project-wide .thumb img").forEach((img) => {
  ScrollTrigger.create({
    trigger: img, start: "top 90%", end: "bottom 10%",
    onEnter: () => gsap.fromTo(img, {scale:1.05, opacity:0}, {scale:1, opacity:1, duration:1, ease:"power2.out"}),
    onLeaveBack: () => gsap.set(img, {scale:1.05, opacity:0})
  });
  gsap.to(img, {
    yPercent: -15,
    ease: "none",
    scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.5 }
  });
});

// Grid projects alternating directions
gsap.utils.toArray(".grid .project").forEach((card,i)=>{
  const dir = card.classList.contains("from-right") ? 1 : -1;
  gsap.from(card, {
    opacity:0,
    x: dir * 60,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger:{
      trigger: card,
      start: "top 85%",
      toggleActions: "play reverse play reverse" // re-animate on scroll up/down
    }
  });
});

// Stacked projects with stagger
ScrollTrigger.batch(".stack .stack-item", {
  start: "top 85%",
  onEnter: batch => gsap.from(batch, {opacity:0, y:40, duration:0.8, stagger:0.15, ease:"power2.out"}),
  onLeaveBack: batch => gsap.to(batch, {opacity:0, y:40, duration:0.3}),
  toggleActions: "play reverse play reverse"
});

// Steps (scale in)
gsap.utils.toArray(".step").forEach((step)=>{
  gsap.from(step, {
    opacity:0, y:20, scale:0.98, duration:0.6, ease:"power2.out",
    scrollTrigger:{ trigger: step, start: "top 90%", toggleActions:"play reverse play reverse" }
  });
});

// Buttons hover magnetic-ish (subtle)
document.querySelectorAll(".btn, .email, .big-email a").forEach(el=>{
  el.addEventListener("mousemove", (e)=>{
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    gsap.to(el, {x: x*0.1, y: y*0.1, duration:0.3, ease:"power2.out"});
  });
  el.addEventListener("mouseleave", ()=>{
    gsap.to(el, {x:0, y:0, duration:0.35, ease:"power3.out"});
  });
});

// Custom cursor (grows on hover)
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e)=>{
  gsap.to(cursor, {x:e.clientX, y:e.clientY, duration:0.18, ease:"power2.out"});
});
document.querySelectorAll("a, .project .thumb").forEach(el=>{
  el.addEventListener("mouseenter", ()=> gsap.to(cursor, {width:56, height:56, background:"rgba(141,211,255,0.2)", borderColor:"transparent", duration:0.2}));
  el.addEventListener("mouseleave", ()=> gsap.to(cursor, {width:28, height:28, background:"transparent", borderColor:"rgba(245,246,248,1)", duration:0.25}));
});

// Keep ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value){ return arguments.length ? lenis.scrollTo(value) : window.scrollY; },
  getBoundingClientRect(){ return {top:0, left:0, width:window.innerWidth, height:window.innerHeight}; }
});