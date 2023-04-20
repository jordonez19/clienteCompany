import { useEffect, useState } from "react";
import axios from "axios";

import { Table, Col, Row, Button, Modal, Input } from "antd";

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
  const [data, setData] = useState();

  
  const [openModal, setOpenModal] = useState(true);

  const [mode, setMode] = useState("");

  const showModal = () => {
    setOpenModal(true);
  };
  const handleOk = () => {
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const response = await axios.get("http://localhost:2000/products/");
    setData(response.data);
  };

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <h1>Mi primera api</h1>
          <Button type="primary" onClick={showModal}>
            Crear
          </Button>
          <Table dataSource={data} columns={columns} />
        </Col>
      </Row>

      <Button onClick={() => {

        setMode("update")
        setOpenModal(true)

        }}>update</Button>

      <Button onClick={() => {
        setMode("CREAR")
        setOpenModal(true)
        }}>CREAR</Button>

      <Modal
        title={mode === "update" ? "Actualizar producto" : "crear producto"}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <p>Some contents...</p>
        <Input placeholder="content" />
        <p>Some contents...</p>
        <Input placeholder="content" />
        <p>Some contents...</p>
        <Input placeholder="content" />
      </Modal>
    </div>
  );
};

export default CrudContainer;
