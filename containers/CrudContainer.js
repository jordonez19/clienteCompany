import { useEffect, useState } from "react";
import axios from "axios";

import { Table, Col, Row, Button, Modal, Input } from "antd";
const { TextArea } = Input;
const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
  },
];

const CrudContainer = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showModal = () => {
    setOpenModal(true);
  };
  const handleOk = () => {
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:2000/products/");
    setData(response.data);
  };

  const handlePost = async () => {
    const response = await axios.post("http://localhost:2000/products/", form);
    if (response.status === 200) {
      alert(response.data.message);
    } else {
      alert("Producto no ha sido creado");
    }
    console.log("response post", response);
    setOpenModal(false);
  };

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h1>Mi primera api</h1>
          <Button type="primary" onClick={showModal}>
            Crear
          </Button>
          <Table rowKey={"id"} dataSource={data} columns={columns} />
        </Col>
      </Row>

      <Modal
        title={"crear producto"}
        open={openModal}
        onOk={handlePost}
        onCancel={() => setOpenModal(false)}
      >
        <p>Nombre:</p>
        <Input
          onChange={handleChange}
          name="name"
          placeholder="content"
          value={form.name}
        />
        <p>Precio</p>
        <Input
          onChange={handleChange}
          name="price"
          placeholder="content"
          value={form.price}
        />
        <p>Descripcion:</p>
        <TextArea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="maxLength is 6"
          rows={4}
          maxLength={25}
        />
      </Modal>
    </>
  );
};

export default CrudContainer;
