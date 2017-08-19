import Modules from 'Modules/index.js';

const { Link } = ReactRouterDOM;

const dashboard = () => {
	console.log(Modules);
	return (
		<div>
			<h1>Dashboard - Ready!</h1>
			<p>Modules: </p>
			<ul>
				{Object.keys(Modules).map((item) => {
					if (_.includes(['ready', 'moduleBase', 'dashboard'], item)) {
						return false;
					}

					return (
						<li key={item}>
							<Link to={`/${item}`}>{item}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default dashboard;
