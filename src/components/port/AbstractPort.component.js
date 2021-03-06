import PropTypes from 'prop-types';
import React from 'react';
import { select, event } from 'd3-selection';

import { Port, Position } from '../../api';
import { PortType } from '../../constants/flowdesigner.proptypes';

class AbstractPort extends React.Component {
	static propTypes = {
		port: PortType,
		onClick: PropTypes.func,
		children: PropTypes.element,
	};

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.d3Node = select(this.node);
		this.d3Node.on('click', this.onClick);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.port !== this.props.port || nextProps.children !== this.props.children;
	}

	onClick() {
		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}

	render() {
		const position = Port.getPosition(this.props.port);
		return (
			<g>
				<g
					ref={c => (this.node = c)}
					transform={`translate(${Position.getXCoordinate(position)},${Position.getYCoordinate(position)})`}
				>
					{this.props.children}
				</g>
			</g>
		);
	}
}

export default AbstractPort;
