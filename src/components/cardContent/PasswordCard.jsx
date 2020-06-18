/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Typography, Space, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const { Text } = Typography;

function App(props) {
	const { isReturningUser, login, name } = props;
	const [ password, setPassword ] = useState('');
	const [ showError, setShowError ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('');

	const handlePwdChange = (e) => {
		setPassword(e.target.value);
	};

	const handleBtnClick = () => {
		if (password === '') return;

		let url;
		if (isReturningUser) url = '/login';
		else url = '/register';

		axios
			.post(url, { name, pwd: password })
			.then(({ data }) => {
				console.log(url + ' res:', data);
				login();
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.error) {
					setErrorMsg('The password you entered is incorrect. Try again!');
					setShowError(true);
					setTimeout(() => {
						setShowError(false);
					}, 5000);
				} else {
					alert(error);
				}
			});
	};

	return (
		<Space direction="vertical">
			{!isReturningUser ? <Text>Choose a password</Text> : <Text>Enter your password</Text>}
			<Input.Password size="large" placeholder="input password" onChange={handlePwdChange} />
			<Button type="primary" size="large" onClick={handleBtnClick}>
				Join room
			</Button>
			{showError ? (
				<Alert
					style={{ maxWidth: 200, textAlign: 'start', marginTop: 20 }}
					message="Error"
					description={errorMsg}
					type="error"
					showIcon
					closable
					onClose={() => setShowError(false)}
				/>
			) : null}
		</Space>
	);
}

export default App;
