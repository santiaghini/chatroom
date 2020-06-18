/*
 * Author: Santiago Hernández
 * Date: June 2020 
*/

import io from 'socket.io-client';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { Typography, Space, Input, Card, Button } from 'antd';
import 'antd/dist/antd.css';

import './Chat.css';

const { Text } = Typography;
const { TextArea } = Input;

function App(props) {
	const { currentUserName, setUsers } = props;
	const [ messages, setMessages ] = useState([]);
	const [ textMessage, setTextMessage ] = useState('');
	const [ socket, setSocket ] = useState(null);

	useEffect(
		() => {
			console.log('useEffect run');
			setSocket(io.connect('http://localhost:3000', { query: 'name=' + encodeURIComponent(currentUserName) }));
		},
		[ currentUserName ]
	);

	const handleOnChat = function(msg, prevMessages) {
		console.log('msg received:', msg);
		prevMessages.push(msg);
		setMessages(JSON.parse(JSON.stringify(prevMessages)));
	};

	const handleOnUsers = (newUsers) => {
		console.log('received users', newUsers);
		setUsers(newUsers);
	};

	const handleOnMessages = (data) => {
		setMessages(data);
	};

	useEffect(
		() => {
			console.log('useeffect for socket');
			if (socket) {
				socket.on('connect', () => {
					console.log('connected');
				});
				socket.on('users', handleOnUsers);
				socket.on('messages', handleOnMessages);
			}
		},
		[ socket ]
	);

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(
		() => {
			console.log('setting socket with messages:', messages);
			if (socket) socket.on('chat', (data) => handleOnChat(data, messages));
			scrollToBottom();
		},
		[ messages ]
	);

	const handleInputChange = (e) => {
		setTextMessage(e.target.value);
	};

	const handleSendClick = () => {
		if (textMessage === '') return;
		setTextMessage('');
		socket.emit('chat', { text: textMessage, user_name: currentUserName });
	};

	// console.log(messages);
	const messageEls = messages.map((message) => (
		<div className={message.user_name === currentUserName ? 'chat-message-self' : 'chat-message-other'}>
			{message.user_name !== currentUserName ? <Text underline>{message.user_name}</Text> : null}
			<Text
				style={{ marginTop: 10, marginBottom: 10 }}
				className={message.user_name === currentUserName ? 'chat-message-self-text' : 'chat-message-other-text'}
			>
				{message.text}
			</Text>
			<Text
				className={message.user_name === currentUserName ? 'chat-message-self-text' : 'chat-message-other-text'}
				style={{ fontSize: '0.5rem' }}
			>
				{moment(message.time).format('MM/DD/YY h:mm a')}
			</Text>
		</div>
	));

	return (
		<Card hoverable bordered={true} style={{ width: 700, height: '100%', paddingLeft: 50, paddingRight: 50 }}>
			<div style={{ width: '100%', height: '100%' }}>
				<div
					style={{
						height: 'calc(100% - 40px)',
						display: 'flex',
						flexDirection: 'column',
						overflowY: 'scroll'
					}}
				>
					{messageEls}
					<div ref={messagesEndRef} />
				</div>
				<Space>
					<TextArea
						placeholder="Write your message here"
						autoSize
						onChange={handleInputChange}
						style={{ width: 450, fontSize: '1.2rem', height: 40 }}
						allowClear
						value={textMessage}
					/>
					<Button type="primary" size="large" onClick={handleSendClick}>
						Send
					</Button>
				</Space>
			</div>
		</Card>
	);
}

export default App;
