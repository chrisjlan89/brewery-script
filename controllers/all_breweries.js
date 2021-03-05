const axios = require("axios");
//const https = require("https");
const states = require("../utils/all_states");
const { parallel } = require("../utils/helpers");
const fs = require("fs");
const path = require("path");

const extraData = async (brewery) => {
  const { name } = brewery;
  const dataurl = process.env.PLACE_DETAIL_URL;
  const addedData = await axios.post(dataurl, {
    input: name,
    inputType: "textquery",
  });

  return { ...brewery, ...addedData.data };
};

const allbreweries = async (req, res) => {
  const start = Date.now();
  const breweryCalls = async (state) => {
    try {
      let page = 0;
      let data = [];
      let response;

      do {
        const requestUrl = `https://api.openbrewerydb.org/breweries?by_state=${state.toLowerCase()}&per_page=50&page=${page}`;
        response = await axios.get(requestUrl);
        page = page + 1;
        if (response.data.length) {
          let copy = [...response.data];

          const mutatedcopy = copy.map((c) => {
            const newcopy = { ...c };
            delete newcopy.id;
            delete newcopy.updated_at;
            delete newcopy.created_at;

            newcopy.phone = parseInt(newcopy.phone);
            newcopy.lng = parseFloat(newcopy.longitude);
            newcopy.lat = parseFloat(newcopy.latitude);
            delete newcopy.longitude;
            delete newcopy.latitude;

            return newcopy;
          });

          data = [...data, ...mutatedcopy];
        }
      } while (response.data.length);

      const dataWithExtra = await parallel(data, extraData);
      return dataWithExtra;

      //  console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const allCalls = await parallel(states, breweryCalls);
  const data = allCalls.flat();

  const dir = path.join(__dirname, "../output/");
  fs.writeFileSync(dir + "all_breweries3.json", JSON.stringify(allCalls));

  res.json({
    duration: Date.now() - start,
    len: data.length,
    data,
  });
};

module.exports = allbreweries;
