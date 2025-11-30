// Dados dos sliders
const designProjects = [
  {
    image: "imagens/Manual da marca - Portal dos Cristais.png",
    title: "Identidade Visual – Marca Portal dos Cristais",
    description:
      "Criação de identidade visual completa: logotipo, paleta de cores, tipografia e aplicações para redes sociais. Desenvolvido para uma loja de cristais terapêuticos.",
    pdfSrc: "imagens/Manual da marca - Portal dos Cristais.pdf", // PDF do projeto 1
    iframeId: "pdf-frame-1" // iframe onde esse projeto será exibido
  },
  {
    image: "imagens/manual da marca versatte.png",
    title: "Identidade Visual eSocial Média – Marca Versatte Sports",
    description:
      "Identidade visual além de Série de artes para feed e stories, focadas em engajamento e consistência visual da marca.",
    pdfSrc: "imagens/manual da marca versatte.pdf", // PDF do projeto 2
    iframeId: "pdf-frame-2"
  },
  {
    image: "imagens/Identidade visual CoreDB.png",
    title: "Identidade Visual – Core DB",
    description:
      "Criação de identidade visual completa: logotipo, paleta de cores, tipografia e aplicações para redes sociais. Desenvolvido para empresa Core DB.",
    pdfSrc: "imagens/Identidade visual CoreDB.pdf", // PDF do projeto 3
    iframeId: "pdf-frame-3"
  }
];

const devProjects = [
  {
    image: "imagens/site_coredb.png",
    title: "Landing Page Responsiva - Core DB",
    description:
      "Página única desenvolvida em HTML, CSS e JavaScript puro, com foco em performance e boas práticas.",
    link: "https://coredb.com.br/"
  },
  {
    image: "imagens/beyond_test.png",
    title: "Aplicação Web - Beyond Test - Ainda em desenvolvimento",
    description:
      "Aplicação ainda em desenvolvimento criada para controlar testes de software a nivel de usuário.",
    link: "https://beyond.dev.br/index.html"
  }
];

// Estado atual dos índices
let designIndex = 0;
let devIndex = 0;

// Atualiza slider de design
function updateDesignSlider() {
  const project = designProjects[designIndex];
  const img = document.getElementById("design-image");
  const title = document.getElementById("design-title");
  const description = document.getElementById("design-description");
  const link = document.getElementById("design-link");
  const indicator = document.getElementById("design-indicator");

  if (!img) return; // segurança

  img.src = project.image;
  img.alt = project.title;
  title.textContent = project.title;
  description.textContent = project.description;

  // aqui o link não aponta pro PDF diretamente, quem cuida disso é o listener
  link.href = "#";

  indicator.textContent = `${designIndex + 1} / ${designProjects.length}`;
}

// Atualiza slider de dev
function updateDevSlider() {
  const project = devProjects[devIndex];
  const img = document.getElementById("dev-image");
  const title = document.getElementById("dev-title");
  const description = document.getElementById("dev-description");
  const link = document.getElementById("dev-link");
  const indicator = document.getElementById("dev-indicator");

  if (!img) return;

  img.src = project.image;
  img.alt = project.title;
  title.textContent = project.title;
  description.textContent = project.description;
  link.href = project.link || "#";
  indicator.textContent = `${devIndex + 1} / ${devProjects.length}`;
}

function goToNext(sliderName) {
  if (sliderName === "design") {
    designIndex = (designIndex + 1) % designProjects.length;
    updateDesignSlider();
  } else if (sliderName === "dev") {
    devIndex = (devIndex + 1) % devProjects.length;
    updateDevSlider();
  }
}

function goToPrev(sliderName) {
  if (sliderName === "design") {
    designIndex =
      (designIndex - 1 + designProjects.length) % designProjects.length;
    updateDesignSlider();
  } else if (sliderName === "dev") {
    devIndex = (devIndex - 1 + devProjects.length) % devProjects.length;
    updateDevSlider();
  }
}

// Tudo que mexe com DOM entra aqui dentro
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa sliders
  updateDesignSlider();
  updateDevSlider();

  // Ano do footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Listeners dos botões dos sliders
  const sliderButtons = document.querySelectorAll(".slider-btn");
  sliderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const slider = btn.getAttribute("data-slider");
      const direction = btn.getAttribute("data-direction");

      if (direction === "next") {
        goToNext(slider);
      } else {
        goToPrev(slider);
      }
    });
  });

  // Simulação de envio de formulário
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Formulário de contato enviado (simulação).");
    });
  }

 // "Ver projeto completo" (Design) → abre PDF no iframe 
const designLink = document.getElementById("design-link");
if (designLink) {
  designLink.addEventListener("click", function (e) {
    e.preventDefault();

    const project = designProjects[designIndex];
    if (!project || !project.pdfSrc || !project.iframeId) return;

    const iframe = document.getElementById(project.iframeId);
    if (!iframe) return;

    iframe.src = project.pdfSrc;

    // Rolar até o iframe correto 🔥 agora funciona para cada projeto
    iframe.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
});
