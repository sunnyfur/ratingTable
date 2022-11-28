const drawTableRow = (person, place) => {
  const cells = [
    { label: "Место", data: place },
    { label: "ФИО", data: person.name },
    { label: "Город", data: person.city },
    { label: "Машина", data: person.car },
    { label: "Общая сумма баллов", data: person.summ.toString() },
    { label: "Первый заезд", data: person.results[0].toString() },
    { label: "Второй заезд", data: person.results[1].toString() },
    { label: "Третий заезд", data: person.results[2].toString() },
    { label: "Четвертый заезд", data: person.results[3].toString() },
  ];

  const row = createElemDOM("tr", "table__row");

  cells.forEach((cell) => {
    let cellHTML = createElemDOM("td", "table__data", cell.data);
    row.appendChild(cellHTML);
    cellHTML.dataset.label = cell.label;
  });

  // let cell = createElemDOM("td", "table__data", place);
  // row.appendChild(cell);
  // cell.dataSet.cell = "Место";
  // row.appendChild(createElemDOM("td", "table__data", person.name));
  // row.appendChild(createElemDOM("td", "table__data", person.city));
  // row.appendChild(createElemDOM("td", "table__data", person.car));
  // row.appendChild(createElemDOM("td", "table__data", person.summ.toString()));
  // row.appendChild(
  //   createElemDOM("td", "table__data", person.results[0].toString())
  // );
  // row.appendChild(
  //   createElemDOM("td", "table__data", person.results[1].toString())
  // );
  // row.appendChild(
  //   createElemDOM("td", "table__data", person.results[2].toString())
  // );
  // row.appendChild(
  //   createElemDOM("td", "table__data", person.results[3].toString())
  // );
  return row;
};

const handleChange = (e) => {
  if (e.target.checked) {
    const table = document.querySelector("tbody");
    table.innerHTML = "";
    if (+e.target.value) {
      [...SortClass.getSortRace(+e.target.value)].forEach((person, index) =>
        table.appendChild(drawTableRow(person, index + 1))
      );
    } else {
      [...SortClass.getSortSum()].forEach((person, index) =>
        table.appendChild(drawTableRow(person, index + 1))
      );
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await SortClass.Init();

  const table = document.querySelector("tbody");
  [...SortClass.getSortSum()].forEach((person, index) =>
    table.appendChild(drawTableRow(person, index + 1))
  );
  document.querySelectorAll(".race__input").forEach((input) => {
    input.addEventListener("change", handleChange);
  });
});
