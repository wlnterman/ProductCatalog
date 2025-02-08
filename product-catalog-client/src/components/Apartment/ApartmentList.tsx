import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Card, Switch } from "antd";
import axios from "axios";
//123import { useAuth } from '../authContext';
//import { createApartment, deleteApartment, getApartments, updateApartment } from "../../services/apartmentService";
import { useAuth } from "../Context/authContext2";
import { createApartment, deleteApartment, getApartments, updateApartment } from "../../services/apartmentService";
import { wrap } from "module";

// Определение интерфейса для категории
export interface Apartment {
  id: string;
  name: string;
  address?: string;
  imageUrl?: string;
}

const ApartmentList: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]); // Типизация состояния
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null); // Типизация редактируемой категории
  const [isGridView, setIsGridView] = useState(true);
  const { currentUser } = useAuth();
  const [form] = Form.useForm();

  const fetchApartments = async () => {
    try {
      const response = await getApartments();
      setApartments(response);
    } catch (error) {
      message.error("Failed to load categories");
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
          //setCategories(categories.filter((category: Category) => category.id !== id));
          message.success("Apartment deleted successfully");
          fetchApartments();
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
        console.log("111111111111111111111111111111111");
        console.log(updatedValues);
        await updateApartment(editingApartment.id, updatedValues);
        setApartments(
          apartments.map((apartment: Apartment) => (apartment.id === editingApartment.id ? { ...apartment, ...values } : apartment))
        );
        message.success("Apartment updated successfully");
      } else {
        const response = await createApartment(values);
        setApartments([...apartments, response.data]);
        message.success("Apartment created successfully");
      }
      setIsModalVisible(false);
      setEditingApartment(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save apartment");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Apartment
        </Button>
        {/* https://rule34.xxx/index.php?page=post&s=view&id=12125039&tags=juno_%28overwatch%29 */}
        {/* https://wimg.rule34.xxx//images/1441/d01160202750552efc0081e72d322726.png?12480703 */}
        <Switch checked={isGridView} onChange={setIsGridView} checkedChildren="Grid" unCheckedChildren="Table" />
      </div>
      {isGridView ? (
        // <div
        //   style={{
        //     display: "grid",
        //     justifyItems: "center",
        //     width: "85%",
        //     gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        //     gap: "16px",
        //   }}
        // >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "1140px",
            marginLeft: "auto",
            marginRight: "auto",
            // justifyItems: "center",
            // width: "85%",
            // gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            // gap: "16px",
          }}
        >
          {/* </div> */}
          {apartments.map((apartment) => (
            <Card
              key={apartment.id}
              style={{ flex: "20%", margin: "10px" }}
              cover={
                <img
                  style={{ height: 200 }}
                  alt="Apartment"
                  src={apartment.imageUrl || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                />
              }
              // https://via.placeholder.com/250
              //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
        <Table dataSource={apartments} rowKey="id" style={{ marginTop: 20 }}>
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
      <Modal title={editingApartment ? "Edit Apartment" : "Add Apartment"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          initialValues={editingApartment || { name: "" }} // Начальные значения для формы
          onFinish={handleSave}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the apartment name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="imageUrl" label="imageUrl">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ApartmentList;
