class SortClass {
  static #data_sorted = "";
  static #data_cars = "";
  static #data_table = "";

  static async Init() {
    await this.setSortedIds();
    await this.setSortedData();
    this.setSort();
  }
  static readFile = (path) => {
    const res = fetch(path).then((response) => response.json());
    return res;
  };
  //get arr of ids sorted by result
  static async setSortedIds() {
    const data_attemts = await SortClass.readFile(
      "../../mock/data_attemts.json"
    );
    const groupedResults = {};
    Object.keys(data_attemts).forEach((key) => {
      const { id, result } = data_attemts[key];
      // console.log(id, result);
      if (groupedResults.hasOwnProperty(id)) {
        groupedResults[id]["summ"] += result;
      } else {
        groupedResults[id] = {};

        groupedResults[id]["id"] = id;
        groupedResults[id]["summ"] = result;
        groupedResults[id]["results"] = [];
      }

      groupedResults[id]["results"].push(result);
    });
    this.#data_sorted = Object.values(groupedResults).sort(
      (a, b) => b.summ - a.summ
    );
  }
  static async setSortedData() {
    const data_cars = await SortClass.readFile("../../mock/data_cars.json");
    this.#data_cars = Object.values(data_cars);
  }
  static getCurrPerson(id) {
    return this.#data_cars.filter((elem) => elem.id == id)[0];
  }
  static setSort() {
    this.#data_table = [...this.#data_sorted].map((result) => ({
      ...result,
      ...this.getCurrPerson(result.id),
    }));
  }
  static getSortSum() {
    return this.#data_table;
  }
  static getSortRace(race) {
    return [...this.#data_table].sort(
      (a, b) => b.results[race] - a.results[race]
    );
  }
}
