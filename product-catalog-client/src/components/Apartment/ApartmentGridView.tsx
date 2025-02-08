import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, message, Switch, Table } from "antd";
import { useAuth } from "../Context/authContext2";
import { createApartment, deleteApartment, getApartments, updateApartment } from "../../services/apartmentService";

interface Apartment {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
}

const ApartmentList: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const { currentUser } = useAuth();
  const [form] = Form.useForm();

  const fetchApartments = async () => {
    try {
      const response = await getApartments();
      setApartments(response);
    } catch (error) {
      message.error("Failed to load apartments");
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleEdit = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this apartment?",
      onOk: async () => {
        try {
          await deleteApartment(id);
          fetchApartments();
          message.success("Apartment deleted successfully");
        } catch (error) {
          message.error("Failed to delete apartment");
        }
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingApartment(null);
    form.resetFields();
  };

  const handleSave = async (values: Apartment) => {
    try {
      if (editingApartment) {
        const updatedValues = { ...values, id: editingApartment.id };
        await updateApartment(editingApartment.id, updatedValues);
      } else {
        const response = await createApartment(values);
        setApartments([...apartments, response.data]);
      }
      fetchApartments();
      message.success("Apartment saved successfully");
      setIsModalVisible(false);
      setEditingApartment(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save apartment");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Apartment
        </Button>
        <Switch checked={isGridView} onChange={setIsGridView} checkedChildren="Grid" unCheckedChildren="Table" />
      </div>
      {isGridView ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
          {apartments.map((apartment) => (
            <Card
              key={apartment.id}
              cover={<img alt="Apartment" src={apartment.imageUrl || "https://via.placeholder.com/250"} />}
              actions={[
                <Button onClick={() => handleEdit(apartment)}>Edit</Button>,
                <Button danger onClick={() => handleDelete(apartment.id)}>
                  Delete
                </Button>,
              ]}
            >
              <Card.Meta title={apartment.name} description={apartment.address} />
            </Card>
          ))}
        </div>
      ) : (
        <Table dataSource={apartments} rowKey="id">
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Address" dataIndex="address" key="address" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(text, record: Apartment) => (
              <>
                <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            )}
          />
        </Table>
      )}
      <Modal title={editingApartment ? "Edit Apartment" : "Add Apartment"} open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} initialValues={editingApartment || { name: "", address: "", imageUrl: "" }} onFinish={handleSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the apartment name!" }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="address" label="Address">
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL">
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item>
            {" "}
            <Button type="primary" htmlType="submit">
              {" "}
              Save{" "}
            </Button>{" "}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApartmentList;
