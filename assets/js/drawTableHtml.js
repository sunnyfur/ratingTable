const drawTableRow = (person, place) => {
  const cells = [
    { label: "Место", data: place, class: "table__data" },
    { label: "ФИО", data: person.name, class: "table__data" },
    { label: "Город", data: person.city, class: "table__data" },
    { label: "Машина", data: person.car, class: "table__data" },
    {
      label: "Общая сумма баллов",
      data: person.summ.toString(),
      class: "table__data data_racesumm",
    },
    {
      label: "Первый заезд",
      data: person.results[0].toString(),
      class: "table__data data_race0",
    },
    {
      label: "Второй заезд",
      data: person.results[1].toString(),
      class: "table__data data_race1",
    },
    {
      label: "Третий заезд",
      data: person.results[2].toString(),
      class: "table__data data_race2",
    },
    {
      label: "Четвертый заезд",
      data: person.results[3].toString(),
      class: "table__data data_race3",
    },
  ];

  const row = createElemDOM("tr", "table__row");

  cells.forEach((cell) => {
    let cellHTML = createElemDOM("td", cell.class, cell.data);
    row.appendChild(cellHTML);
    cellHTML.dataset.label = cell.label;
  });
  return row;
};

const sortTable = (pos) => {
  const table = document.querySelector(".table__body");
  table.innerHTML = "";
  let cells = document.querySelectorAll(".active");
  cells.forEach((cell) => cell.classList.toggle("active"));

  if (+pos) {
    [...SortClass.getSortRace(+pos)].forEach((person, index) =>
      table.appendChild(drawTableRow(person, index + 1))
    );
  } else {
    [...SortClass.getSortSum()].forEach((person, index) =>
      table.appendChild(drawTableRow(person, index + 1))
    );
  }
  cells = document.querySelectorAll(`.data_race${pos}`);
  cells.forEach((cell) => cell.classList.toggle("active"));
};

const handleChange = (e) => {
  if (e.target.checked) {
    sortTable(e.target.value);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await SortClass.Init();

  const table = document.querySelector("tbody");
  sortTable("summ");

  document.querySelectorAll(".race__input").forEach((input) => {
    input.addEventListener("change", handleChange);
  });
});
