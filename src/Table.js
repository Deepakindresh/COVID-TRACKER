import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      <div className="table__head">
          <th>COUNTRIES</th>
          <th>CASES</th>
          <th>RECOVERED</th>
          <th>DEATHS</th>
      </div>
      
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td className="table__cases">
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
          <td className="table__recovered">
            <strong>{numeral(country.recovered).format("0,0")}</strong>
          </td>
          <td className="table__deaths">
            <strong>{numeral(country.deaths).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
