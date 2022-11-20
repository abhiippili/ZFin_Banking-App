class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //Basic Filtering
    const queryObject = { ...this.queryString };
    const excludeFields = ["page", "sort", "fields", "limit"];
    excludeFields.forEach((el) => delete queryObject[el]);
    this.query = this.query.find(queryObject);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
}

module.exports = APIFeatures;
