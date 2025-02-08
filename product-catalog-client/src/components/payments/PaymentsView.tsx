// PaymentsView.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Input, DatePicker, Form } from "antd";
import { fetchPayments, addPayment, Payment } from "../../services/paymentsService";
import dayjs from "dayjs";
import { getCurrentUserDecodedToken } from "../../services/authService";

const PaymentsView: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Заглушка: пока нет userId и objectId, можно передавать их жестко
  const user = getCurrentUserDecodedToken();
  const userId = user.userId;
  const objectId = 1;

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const payments = await fetchPayments(userId, objectId, "2024-01-01", "2024-02-01");
        setPayments(payments);
      } catch (error) {
        console.error(error);
      }
    };

    loadPayments();
  }, [userId, objectId]);

  //   useEffect(() => {
  //     const loadPayments = async () => {
  //       setLoading(true);
  //       const data = await fetchPayments();
  //       setPayments(data);
  //       setLoading(false);
  //     };
  //     loadPayments();
  //   }, []);

  const columns = [
    { title: "Дата", dataIndex: "date", key: "date", render: (text: string) => dayjs(text).format("YYYY-MM-DD") },
    { title: "Сумма", dataIndex: "amount", key: "amount" },
    ...Object.keys(payments[0] || {})
      .filter((key) => key !== "id" && key !== "date" && key !== "amount")
      .map((category) => ({ title: category, dataIndex: category, key: category })),
  ];

  const handleAddPayment = async (values: Payment) => {
    const newPayment: Payment = { ...values, date: values.date };
    const savedPayment = await addPayment(newPayment);
    setPayments([...payments, savedPayment]);
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={handleAddPayment} layout="inline">
        <Form.Item name="date">
          {/* rules={[{ required: true }]} */} <DatePicker />{" "}
        </Form.Item>
        <Form.Item name="amount">
          {/* rules={[{ required: true }]} */} <Input placeholder="Сумма" type="number" />{" "}
        </Form.Item>
        <Form.Item>
          {" "}
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>{" "}
        </Form.Item>
      </Form>
      <Table dataSource={payments} columns={columns} loading={loading} rowKey="id" />
    </div>
  );
};

export default PaymentsView;
