import React,  { useState } from 'react';

const CountryDetails = (props) => {
  const { countryId, countryClimate } = props;

  return (
    <div className="rounded p-4 border mb-4">
      {countryClimate.length === 0 ?
        <p className="text-center my-4">Sorry, there is no climate data available for this country</p>
        :
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul className="list-unstyled my-3">
              {countryClimate.map(item => (
                <li key={item.year} className="border rounded shadow-sm p-3 mb-3 d-flex justify-content-between">
                  <div>{item.year}</div>
                  <div>{item.data}°C</div>
                </li>
              ))}
          </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default CountryDetails;
