const courses = [
  { id: "Matemática I", semester: 1, credits: 4 },
  { id: "Biología General", semester: 1, credits: 4 },
  { id: "Técnicas de Comunicación científica", semester: 1, credits: 3 },
  { id: "Introducción a las Ciencias del Mar", semester: 1, credits: 3 },
  { id: "Inglés I", semester: 1, credits: 3 },
  { id: "Complementario 1", semester: 1, credits: 2 },

  { id: "Matemática II", semester: 2, credits: 4, prereq: ["Matemática I"] },
  { id: "Biología Marina", semester: 2, credits: 4 },
  { id: "Química General I", semester: 2, credits: 5 },
  { id: "Introducción a la Biodiversidad Marina", semester: 2, credits: 4 },
  { id: "Inglés II", semester: 2, credits: 3, prereq: ["Inglés I"] },
  { id: "Complementario 2", semester: 2, credits: 2 },

  { id: "Programación", semester: 3, credits: 3 },
  { id: "Física I", semester: 3, credits: 4, prereq: ["Matemática I"] },
  { id: "Química General II", semester: 3, credits: 5 },
  { id: "Botánica Marina", semester: 3, credits: 4, prereq: ["Introducción a la Biodiversidad Marina"] },
  { id: "Zoología Marina", semester: 3, credits: 5, prereq: ["Introducción a la Biodiversidad Marina"] },
  { id: "Complementario 3", semester: 3, credits: 2 }
];

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
    grouped[c.semester] = grouped[c.semester] || [];
    grouped[c.semester].push(c);
  });

  Object.keys(grouped).sort((a, b) => a - b).forEach(sem => {
    const col = document.createElement('div');
    col.className = "semester-column";
    col.innerHTML = `<h3>Semestre ${sem}</h3>`;

    grouped[sem].forEach(course => {
      const div = document.createElement('div');
      div.className = 'course';

      if (approved.has(course.id)) {
        div.classList.add("completed");
      } else if (isAvailable(course)) {
        div.classList.add("available");
      } else {
        div.classList.add("locked");
      }

      div.textContent = `${course.id} (${course.credits} cr.)`;
      div.onclick = () => {
        if (isAvailable(course) || approved.has(course.id)) {
          if (approved.has(course.id)) {
            approved.delete(course.id);
          } else {
            approved.add(course.id);
          }
          render();
        }
      };

      col.appendChild(div);
    });

    chart.appendChild(col);
  });
}

render();
