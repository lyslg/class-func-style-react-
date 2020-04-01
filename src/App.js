import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	let [funcShow, setFuncShow] = useState(true);
	let [classShow, setClassShow] = useState(true);

	return (
		<div className="container">
			<h1>Hello World!</h1>
			<input
				type="button"
				value="remove func"
				onClick={() => {
					setFuncShow(!funcShow);
				}}
			/>
			<input
				type="button"
				value="remove class"
				onClick={() => {
					setClassShow(!classShow);
				}}
			/>
			{funcShow && <FuncComp initNumber={2}></FuncComp>}
			{classShow && <ClassComp initNumber={2}></ClassComp>}
		</div>
	);
}

var funcStyle = "color: skyblue";
var funcId = 0;
function FuncComp(props) {
	// let numberState = useState(props.initNumber);
	// let number = numberState[0];
	// let setNumber = numberState[1];
	const [number, setNumber] = useState(props.initNumber);
	const [_date, setDate] = useState(new Date().toString());

	//side effect
	useEffect(() => {
		console.log(
			"%cfunc => useEffect (componentDidMount)" + ++funcId,
			funcStyle
		);
		// document.title = number + " : " + _date;
		document.title = number;
		return () => {
			console.log(
				"%cfunc => useEffect return (componentDidMount & componentDidUpdate)" +
					++funcId,
				funcStyle
			);
		};
	}, []);

	useEffect(() => {
		console.log(
			"%cfunc => useEffect number(componentDidMount & componentDidUpdate)" +
				++funcId,
			funcStyle
		);
		// document.title = number + " : " + _date;
		document.title = number;
		return () => {
			console.log(
				"%cfunc => useEffect return (componentDidMount & componentDidUpdate)" +
					++funcId,
				funcStyle
			);
		};
	}, [number]);

	useEffect(() => {
		console.log(
			"%cfunc => useEffect _date(componentDidMount & componentDidUpdate)" +
				++funcId,
			funcStyle
		);
		document.title = _date;
		return () => {
			console.log(
				"%cfunc => useEffect return (componentDidMount & componentDidUpdate)" +
					++funcId,
				funcStyle
			);
		};
	}, [_date]);

	console.log("%cfunc => render" + ++funcId, funcStyle);

	return (
		<div className="container">
			<h2>function style component</h2>
			<p>Number: {number}</p>
			<input
				type="button"
				value="random"
				onClick={function() {
					setNumber(Math.random());
				}}></input>

			<p>Date: {_date}</p>
			<input
				type="button"
				value="date"
				onClick={function() {
					setDate(new Date().toString());
				}}></input>
		</div>
	);
}

var classStyle = "color:red";
class ClassComp extends React.Component {
	state = {
		number: this.props.initNumber,
		date: new Date().toString()
	};

	componentWillMount() {
		console.log("%cclass => componentWillMount", classStyle);
	}

	componentDidMount() {
		console.log("%cclass => componentDidMount", classStyle);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("%cclass => shouldComponentUpdate", classStyle);
		return true;
	}
	componentWillUpdate() {
		console.log("%cclass => componentWillUpdate", classStyle);
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("%cclass => componentDidUpdate", classStyle);
	}

	render() {
		console.log("%cclass => render", classStyle);
		return (
			<div className="container">
				<h2>class style component</h2>
				<p>Number: {this.state.number}</p>
				<input
					type="button"
					value="random"
					onClick={function() {
						this.setState({
							number: Math.random()
						});
					}.bind(this)}></input>
				<p>Date: {this.state.date}</p>
				<input
					type="button"
					value="date"
					onClick={function() {
						this.setState({
							date: new Date().toString()
						});
					}.bind(this)}></input>
			</div>
		);
	}
}

export default App;
