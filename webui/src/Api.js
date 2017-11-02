var Api = {
    API_URL: 'http://localhost:8000/api',

    getYearlyBills(year) {
        return fetch(`${this.API_URL}/bills?year=${year}`)
          .then(results => {
              return results.json();
          });
    },

    getMonthlyBills(year, month) {
        return fetch(`${this.API_URL}/bills/year/${year}/month/${month}`)
          .then(results => {
              return results.json();
          });
    },

    getYearlyBillsAppartment(year, appartment) {
        return fetch(`${this.API_URL}/bills/${year}/appartment/${appartment}`)
          .then(results => {
              return results.json();
          });
    }
};

export default Api;
