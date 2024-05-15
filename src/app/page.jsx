/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/app/page.module.css";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [query, setQuery] = useState("");

  const searchFilter = (array) => {
    if (array.length > 1) {
      return array.filter((el) => el.bankName.toLowerCase().includes(query));
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const deleteBank = (name) => {
    let data1 = data.filter((i) => i.bankName !== name);
    setData(data1);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://dev.obtenmas.com/catom/api/challenge/banks")
      .then((response) => {
        const newArray = response.data.sort((a, b) =>
          a.bankName > b.bankName ? 1 : -1
        );
        setData(newArray.sort());
      })
      .catch((error) => {});
  };

  const filtered = searchFilter(data);

  return (
    <div className="container">
      <div className="tbl_container">
        <h1 className="title">LISTA DE BANCOS</h1>
        <h5 className="subtitle"> Busca por nombre del banco: </h5>
        <input
          type="text"
          placeholder="Buscar"
          className="filter"
          onChange={handleChange}
        />
        <table className="tbl">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Nombre del banco</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered &&
              filtered.map((mydata) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td data-lable="Id">{mydata?.age}</td>
                  <td data-lable="Nombre del banco">{mydata?.bankName}</td>
                  <td data-lable="Descripción">{mydata?.description}</td>
                  <td data-lable="Imagen" className="centered">
                    <img src={mydata?.url} alt="imagenBanks" />
                  </td>
                  <td data-lable="Acción">
                    <button
                      className="button"
                      onClick={() => deleteBank(mydata?.bankName)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
