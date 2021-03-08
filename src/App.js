import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import axios from 'axios';
import Select from 'react-select';
import CountryDetails from './components/CountryDetails';

function App() {
  const [data, setData] = useState({ 
    countryList: [],
    countryClimate: []
  });
  const [countryId, setCountryId] = useState(null);
  const [countryDetails, setCountryDetails] = useState(false);
  const [countryListDataUrl, setCountryListDataUrl] = useState(
    'http://api.worldbank.org/v2/country?format=json'
  );
  const [countryClimateDataUrl, setCountryClimateDataUrl] = useState(
    'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/ABW.json'
  );

  useEffect(() => {
    const fetchData = async () => {
      const countryListData = await axios(countryListDataUrl);
      const countryClimateData = await axios(countryClimateDataUrl);
      setData({
        countryList: countryListData.data[1],
        countryClimate: countryClimateData.data
      });
    };
    fetchData();
  }, [
    countryListDataUrl,
    countryClimateDataUrl
  ]);

  const countryListMap = data.countryList.map((item) => {
    return {
      value: item.id,
      label: item.name
    }
  });

  let countryListOptions = (!data.countryList || data.countryList.length === 0) ? null : countryListMap;

  const updateCountryClimate = () => {
    setCountryClimateDataUrl(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/${countryId}.json`);
    setCountryDetails(true);
  }

  const updateCountryId = (value) => {
    setCountryId(value);
    // To Do: Research why this second function only runs after clicking twice
    // updateCountryClimate();
  }
  
  return (
    <main className="container">
        <h1 className="mt-5 mb-2 text-center">Historical World Temperatures</h1>
        <p className="lead text-center mb-4">Learn more about climate change by viewing historical temperature data by country</p>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-light rounded p-4 mb-4">
              <div className="row">
                <div className="col">
                  {/* Include screen reader only label for 508 */}
                  <label className="visually-hidden" for="selectCountryInput">Select a Country</label>
                  {/* To Do: Update / research react select placeholder color for 508 */}
                  <Select
                    value={data.countryList.find((obj) => obj.value === countryId)}
                    options={countryListOptions}
                    onChange={(event) => updateCountryId(event.value)}
                    placeholder="Select a Country"
                    inputId="selectCountryInput" />
                </div>
                <div className="col-2 d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateCountryClimate}>
                    Get Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {(countryId && countryDetails) && 
              <CountryDetails countryId={countryId} countryClimate={data.countryClimate} />
            }
          </div>
        </div>
    </main>
  );
}

export default App;
