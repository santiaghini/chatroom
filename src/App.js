/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

// clg to log

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import './App.css';

// import components
import NameCard from './components/cardContent/NameCard';
import PasswordCard from './components/cardContent/PasswordCard';
import Chat from './components/chat/Chat';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function App() {
	const [ cardIsVisible, setCardIsVisible ] = useState(true);
	const [ currentCard, setCurrentCard ] = useState('name');
	const [ currentUserName, setCurrentUserName ] = useState('');
	const [ chatIsActive, setChatIsActive ] = useState(false);
	const [ users, setUsers ] = useState([]);
	const [ isReturningUser, setIsReturningUser ] = useState(false);

	useEffect(() => {
		axios
			.get('/users')
			.then(({ data }) => {
				console.log('GET /users', data);
				setUsers(data.users);
			})
			.catch((error) => console.error(error));
	}, []);

	const cardTitle =
		currentCard === 'name'
			? "What's your name?"
			: !isReturningUser ? 'Welcome, ' + currentUserName : 'Welcome back, ' + currentUserName;

	const usersEls = users.map((user) => (
		<React.Fragment key={'userbar:' + user.name}>
			<Space>
				<div
					style={{
						height: '0.6rem',
						width: '0.6rem',
						borderRadius: '50%',
						backgroundColor: user.status ? 'lightgreen' : 'grey',
						border: '1px solid white'
					}}
				/>
				<Text style={{ color: 'white' }}>{user.name}</Text>
			</Space>
		</React.Fragment>
	));

	const handleLogin = () => {
		setCardIsVisible(false);
		setChatIsActive(true);
	};

	return (
		<div className="App">
			<Layout className="fullHeight">
				<Header>
					<Text style={{ fontSize: '2rem', color: 'white' }}>chatroom</Text>
					<Text style={{ fontSize: '1.2rem', color: 'gray' }}> by santiaghini</Text>
				</Header>
				<Layout>
					<Content style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
						{cardIsVisible ? (
							<Card
								hoverable
								title={cardTitle}
								bordered={false}
								style={{ width: 350, cursor: 'default' }}
							>
								{currentCard === 'name' ? (
									<NameCard
										setCurrentCard={setCurrentCard}
										setCurrentUserName={setCurrentUserName}
										setIsReturningUser={setIsReturningUser}
									/>
								) : (
									<PasswordCard
										name={currentUserName}
										login={handleLogin}
										isReturningUser={isReturningUser}
									/>
								)}
							</Card>
						) : null}
						{chatIsActive ? <Chat currentUserName={currentUserName} setUsers={setUsers} /> : null}
					</Content>
					<Sider>
						<Space direction="vertical" align="start">
							<Space style={{ fontSize: '1.3rem', color: 'white', marginBottom: 20 }}>
								<UserOutlined />
								<Text style={{ fontSize: '1.3rem', color: 'white' }}>chatroom users</Text>
							</Space>
							<Space direction="vertical" align="start">
								{usersEls}
							</Space>
						</Space>
					</Sider>
				</Layout>
			</Layout>
		</div>
	);
}

export default App;
