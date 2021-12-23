import "./App.css";
import "./Components/Orders.css"
import home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Orders from "./Components/Orders";
import History from "./Components/History";
import assign from "./Components/Assign";
import Update from "./Components/Update";
import Porters from "./Components/Porters";
import GenerateReport from "./Components/GenerateReport";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/' component={home} />
					<Route path='/homeDelivery' component={home} />
					<Route path='/orders' component={Orders} />
					<Route path='/history' component={History} />
					<Route path='/assign' component={assign} />
					<Route path='/update' component={Update} />
					<Route path='/porters' component={Porters} />
					<Route path='/generatereport' component={GenerateReport} />


				</Switch>
			</div>
		</Router>
	);
}

export default App;

