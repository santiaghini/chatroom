/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

import React, { useState } from 'react';
import { Layout, Row, Col, Tooltip, Typography, Space, Input, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Content, Sider, Footer } = Layout;
const { Text, Link } = Typography;

function App(props) {
	const { setCurrentCard } = props;

	return (
		<Space direction="vertical">
			<Input size="large" placeholder="large size" prefix={<UserOutlined />} />
			<Button type="primary" size="large" onClick={() => setCurrentCard('password')}>
				Next
			</Button>
		</Space>
	);
}

export default App;
