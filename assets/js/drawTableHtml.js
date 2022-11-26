const drawTableRow = (person, place) => {
  const row = createElemDOM("tr");
  row.appendChild(createElemDOM("td", "", place));
  row.appendChild(createElemDOM("td", "", person.name));
  row.appendChild(createElemDOM("td", "", person.city));
  row.appendChild(createElemDOM("td", "", person.car));
  row.appendChild(createElemDOM("td", "", person.summ.toString()));
  row.appendChild(createElemDOM("td", "", person.results[0].toString()));
  row.appendChild(createElemDOM("td", "", person.results[1].toString()));
  row.appendChild(createElemDOM("td", "", person.results[2].toString()));
  row.appendChild(createElemDOM("td", "", person.results[3].toString()));
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
