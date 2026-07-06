const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if(navToggle && navLinks){
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        if(navLinks.classList.contains("open")){
            navToggle.innerHTML = "×";
            document.body.style.overflow = "hidden";
        }else{
            navToggle.innerHTML = "☰";
            document.body.style.overflow = "";
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.innerHTML = "☰";
            document.body.style.overflow = "";
        });
    });
}

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slider-dot')];
let active = 0;
let timer;
function showSlide(index){
  slides[active].classList.remove('active');
  dots[active].classList.remove('active');
  active = index;
  slides[active].classList.add('active');
  dots[active].classList.add('active');
}
function startSlider(){
  timer = setInterval(() => showSlide((active + 1) % slides.length), 6000);
}
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    showSlide(index);
    startSlider();
  });
});
startSlider();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));
const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
    if(window.scrollY > 40){
        siteHeader.classList.add("scrolled");
    }else{
        siteHeader.classList.remove("scrolled");
    }
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold:0.15
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});