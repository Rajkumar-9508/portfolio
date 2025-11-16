// Scroll reveal animations
const sections = document.querySelectorAll("section");
const toggle = document.getElementById("darkModeToggle");
const darkToggle = document.getElementById("darkModeToggle");
const body = document.body;
const reveals = document.querySelectorAll(".reveal");
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const resumeSection = document.getElementById("resume");
const contactSection = document.getElementById("contact");

// Toggle sidebar
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  sidebar.classList.toggle("open");
});

// Handle sidebar link clicks
document.querySelectorAll(".sidebar-content a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.classList.remove("open");

    // Hide all sections first
    [resumeSection,  contactSection].forEach(
      (sec) => (sec.style.display = "none")
    );

    // Show clicked section
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.style.display = "flex";
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Dark mode toggle
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
});

function openModal(img) {
  var modal = document.getElementById("imgModal");
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
}

function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}
