/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

import React, { useState } from 'react';
import { Layout, Row, Col, Tooltip, Typography, Space, Input, Card, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Content, Sider, Footer } = Layout;
const { Text, Link } = Typography;

function App(props) {
	const { prop1 } = props;

	return (
		<Space direction="vertical">
			<Input.Password size="large" placeholder="input password" />
			<Button type="primary" size="large">
				Join room
			</Button>
		</Space>
	);
}

export default App;
