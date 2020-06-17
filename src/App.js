/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

// clg to log

import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Tooltip, Typography, Space, Input, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import logo from './media/images/logo.svg';
import './App.css';

// import components
import NameCard from './components/cardContent/NameCard';
import PasswordCard from './components/cardContent/PasswordCard';

const { Header, Content, Sider, Footer } = Layout;
const { Text, Link } = Typography;

function App(props) {
	const { prop1 } = props;
	const [ cardIsVisible, setCardIsVisible ] = useState(true);
	const [ currentCard, setCurrentCard ] = useState('name');
	const [ currentUserName, setCurrentUserName ] = useState('');

	const handleEnterName = (name) => {
		setCurrentUserName(name);
		setCurrentCard('password');
	};

	return (
		<div className="App">
			<Layout className="fullHeight">
				<Header>header</Header>
				<Layout>
					<Content>
						<Space direction="vertical">
							<Card hoverable title="What's your name?" bordered={false} style={{ width: 300 }}>
								{currentCard === 'name' ? <NameCard /> : <PasswordCard />}
							</Card>
						</Space>
					</Content>
				</Layout>
				<Footer>chatroom © 2020</Footer>
			</Layout>
		</div>
	);
}

export default App;
