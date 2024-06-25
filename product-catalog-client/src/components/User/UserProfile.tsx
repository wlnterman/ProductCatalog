import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useAuth } from '../Context/authContext2';
import { getUserProfile, updateUserProfile } from '../../services/userService';
//import { getUserProfile, updateUserProfile } from '../../services/userService';
//import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
    const { currentUser } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (currentUser) {
                //const profile = await getUserProfile(currentUser.sub);
                const profile = await getUserProfile(currentUser.UserId);
                form.setFieldsValue(profile);
            }
        };

        fetchUserProfile();
    }, [currentUser, form]);

    const handleSave = async (values: any) => {
        try {
            setLoading(true);
            await updateUserProfile(currentUser.sub, values);
            notification.success({ message: 'Profile updated successfully' });
        } catch (error) {
            notification.error({ message: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserProfile;