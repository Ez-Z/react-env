
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

export default function HooksTest(props) {
	const [counter, setNum] = useState(0);
	useEffect(()=> {
		document.title = '点了' + counter;
	})


	// return [counter, setNum];
	return (
		<div>
			<span>{counter}</span>
			<Button onClick={() => setNum(counter + 1)}>numAdd</Button>
		</div>
	);
}
