import { useEffect, useState } from "react";
import axios from "axios";

const CrudContainer = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const response = await axios.get("http://localhost:2000/products/");
    setData(response.data);
  };
  return (
    <>
      <h1>Mi primera api</h1>
      <table border="solid">
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>price</td>
            <td>description</td>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CrudContainer;
