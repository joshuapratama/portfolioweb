gsap.registerPlugin(TextPlugin);

const typewriter = document.querySelector('.typewriter');
if(typewriter){
  const fullText = "LET’S DESIGN IT RIGHT";
  const typeSpeed = 0.08;
  const eraseSpeed = 0.04;
  const pause = 1.2;

  function typeLoop(){
    // Type
    gsap.to(typewriter, {
      duration: fullText.length * typeSpeed,
      text: fullText + "|",
      ease:"none",
      onComplete: ()=>{
        gsap.delayedCall(pause, ()=>{
          // Erase
          gsap.to(typewriter, {
            duration: fullText.length * eraseSpeed,
            text: "",
            ease:"none",
            onComplete: typeLoop
          });
        });
      }
    });
  }

  typeLoop();
  
}
// Fade-in hero title letter by letter
const heroTitle = document.querySelector(".hero-title");
if(heroTitle){
  heroTitle.innerHTML = heroTitle.textContent
    .split("")
    .map(char => char === " " ? " " : `<span class="letter">${char}</span>`)
    .join("");

  const letters = document.querySelectorAll(".hero-title .letter");
  gsap.set(letters, {opacity:0, y:40}); // initial state

  gsap.to(letters, {
    opacity:1,
    y:0,
    duration:0.8,
    ease:"power3.out",
    stagger:{ each:0.08 } // Adjust speed here
  });
}