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
  // Puedes continuar agregando los demás semestres...
];

// Agrupar por semestre
const coursesBySemester = {};
courses.forEach(course => {
  if (!coursesBySemester[course.semester]) {
    coursesBySemester[course.semester] = [];
  }
  coursesBySemester[course.semester].push(course);
});

// Crear columnas por semestre
const chart = document.getElementById('chart');

Object.keys(coursesBySemester).sort((a, b) => a - b).forEach(semester => {
  const col = document.createElement('div');
  col.className = 'semester-column';
  col.innerHTML = `<h3>Semestre ${semester}</h3>`;

  coursesBySemester[semester].forEach(course => {
    const div = document.createElement('div');
    div.className = 'course';
    div.textContent = `${course.id} (${course.credits} cr.)`;
    div.title = course.prereq ? `Prerrequisitos: ${course.prereq.join(", ")}` : 'Sin prerrequisitos';
    col.appendChild(div);
  });

  chart.appendChild(col);
});

