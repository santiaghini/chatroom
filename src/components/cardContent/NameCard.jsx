/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

import axios from 'axios';
import React, { useState } from 'react';
import { Space, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function App(props) {
	const { setCurrentCard, setCurrentUserName, setIsReturningUser } = props;
	const [ name, setName ] = useState('');

	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	const handleButtonClick = () => {
		if (name === '') return;
		axios
			.post('/user', { name })
			.then(({ data }) => {
				// returning user
				console.log('/user res', data);
				setCurrentUserName(name);
				setIsReturningUser(true);
				setCurrentCard('password');
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.error) {
					// this is a new user
					console.log('/user error res', error.response.data);
					setCurrentUserName(name);
					setIsReturningUser(false);
					setCurrentCard('password');
				} else {
					console.error(error);
				}
			});
	};

	return (
		<Space direction="vertical">
			<Input
				value={name}
				size="large"
				placeholder="Your name"
				prefix={<UserOutlined />}
				onChange={handleInputChange}
			/>
			<Button type="primary" size="large" onClick={handleButtonClick}>
				Next
			</Button>
		</Space>
	);
}

export default App;
