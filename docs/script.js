const courses = [
  // Semestre 1
  { id: "Matemática I", semester: 1, credits: 4 },
  { id: "Biología General", semester: 1, credits: 4 },
  { id: "Técnicas de Comunicación científica", semester: 1, credits: 3 },
  { id: "Introducción a las Ciencias del Mar", semester: 1, credits: 3 },
  { id: "Inglés I", semester: 1, credits: 3 },
  { id: "Complementario 1", semester: 1, credits: 2 },

  // Semestre 2
  { id: "Matemática II", semester: 2, credits: 4, prereq: ["Matemática I"] },
  { id: "Biología Marina", semester: 2, credits: 4 },
  { id: "Química General I", semester: 2, credits: 5 },
  { id: "Introducción a la Biodiversidad Marina", semester: 2, credits: 4 },
  { id: "Inglés II", semester: 2, credits: 3, prereq: ["Inglés I"] },
  { id: "Complementario 2", semester: 2, credits: 2 },

  // Semestre 3
  { id: "Programación", semester: 3, credits: 3 },
  { id: "Física I", semester: 3, credits: 4, prereq: ["Matemática I"] },
  { id: "Química General II", semester: 3, credits: 5 },
  { id: "Botánica Marina", semester: 3, credits: 4, prereq: ["Introducción a la Biodiversidad Marina"] },
  { id: "Zoología Marina", semester: 3, credits: 5, prereq: ["Introducción a la Biodiversidad Marina"] },
  { id: "Complementario 3", semester: 3, credits: 2 },

  // Semestre 4
  { id: "Bioestadística I", semester: 4, credits: 4, prereq: ["Matemática II"] },
  { id: "Física II", semester: 4, credits: 4, prereq: ["Física I"] },
  { id: "Química Orgánica", semester: 4, credits: 4, prereq: ["Química General II"] },
  { id: "Biología de Recursos", semester: 4, credits: 4, prereq: ["Botánica Marina", "Zoología Marina"] },
  { id: "Fundamentos y Metodología de las ciencias", semester: 4, credits: 3, prereq: ["Botánica Marina", "Zoología Marina"] },
  { id: "Electivo 1", semester: 4, credits: 4 },

  // Semestre 5
  { id: "Bioestadística II", semester: 5, credits: 4, prereq: ["Bioestadística I", "Fundamentos y Metodología de las ciencias"] },
  { id: "Oceanografía General", semester: 5, credits: 4, prereq: ["Física I", "Introducción a las Ciencias del Mar", "Introducción a la Biodiversidad Marina", "Química General II"] },
  { id: "Análisis Instrumental", semester: 5, credits: 4, prereq: ["Química Orgánica"] },
  { id: "Biología Pesquera", semester: 5, credits: 4, prereq: ["Bioestadística I", "Biología de Recursos"] },
  { id: "Electivo 2", semester: 5, credits: 4 },

  // Semestre 6
  { id: "Bioquímica", semester: 6, credits: 4, prereq: ["Química Orgánica"] },
  { id: "Oceanografía Biológica", semester: 6, credits: 4, prereq: ["Oceanografía General"] },
  { id: "Ecología Marina", semester: 6, credits: 3, prereq: ["Bioestadística II", "Zoología Marina", "Botánica Marina"] },
  { id: "Impacto Antropológico", semester: 6, credits: 4, prereq: ["Oceanografía General", "Análisis Instrumental"] },
  { id: "Electivo 3", semester: 6, credits: 4 },

  // Semestre 7
  { id: "Fisiología Animal", semester: 7, credits: 4, prereq: ["Zoología Marina", "Bioquímica"] },
  { id: "Genética de Organismos", semester: 7, credits: 4, prereq: ["Bioquímica"] },
  { id: "Legislación y Sustentabilidad", semester: 7, credits: 4 },
  { id: "Microbiología Marina", semester: 7, credits: 4, prereq: ["Bioquímica"] },
  { id: "Electivo 4", semester: 7, credits: 4 },

  // Semestre 8
  { id: "Evolución y Biogeografía", semester: 8, credits: 4, prereq: ["Genética de Organismos"] },
  { id: "Economía", semester: 8, credits: 4, prereq: ["Bioestadística II"] },
  { id: "Conservación Marina", semester: 8, credits: 4, prereq: ["Ecología Marina", "Botánica Marina", "Zoología Marina"] },
  { id: "Acuicultura", semester: 8, credits: 4, prereq: ["Botánica Marina", "Zoología Marina"] },
  { id: "Electivo 5", semester: 8, credits: 4 },

  // Semestre 9
  { id: "Producción y Control de Calidad", semester: 9, credits: 3, prereq: ["Acuicultura", "Legislación y Sustentabilidad"] },
  { id: "Taller de Divulgación Científica", semester: 9, credits: 2 },
  { id: "Proyecto de seminario", semester: 9, credits: 2 },
  { id: "Práctica Profesional", semester: 9, credits: 4 },

  // Semestre 10 (¡prerrequisito: TODO!)
  {
    id: "Seminario de Título",
    semester: 10,
    credits: 20,
    prereq: [] // Lo completamos abajo con todos los ramos anteriores
  }
];

// 🔧 Agregar todos los ramos como prerrequisitos del Seminario de Título
const allIdsExceptTitulo = courses
  .filter(c => c.id !== "Seminario de Título")
  .map(c => c.id);

const titulo = courses.find(c => c.id === "Seminario de Título");
titulo.prereq = allIdsExceptTitulo;

// 🎯 Lógica de la malla interactiva
const chart = document.getElementById('chart');
const approved = new Set();

function isAvailable(course) {
  if (!course.prereq) return true;
  return course.prereq.every(p => approved.has(p));
}

function render() {
  chart.innerHTML = "";
  const grouped = {};
  courses.forEach(c => {
    if (!grouped[c.semester]) grouped[c.semester] = [];
    grouped[c.semester].push(c);
  });

  Object.keys(grouped).sort((a, b) => a - b).forEach(sem => {
    const col = document.createElement("div");
    col.className = "semester-column";
    col.innerHTML = `<h3>Semestre ${sem}</h3>`;

    grouped[sem].forEach(course => {
      const div = document.createElement("div");
      div.className = "course";
      div.textContent = `${course.id} (${course.credits} cr.)`;

      if (approved.has(course.id)) {
        div.classList.add("completed");
      } else if (isAvailable(course)) {
        div.classList.add("available");
      } else {
        div.classList.add("locked");
      }

      div.onclick = () => {
        if (!isAvailable(course) && !approved.has(course.id)) return;
        if (approved.has(course.id)) {
          approved.delete(course.id);
        } else {
          approved.add(course.id);
        }
        render();
      };

      col.appendChild(div);
    });

    chart.appendChild(col);
  });
}

render();
