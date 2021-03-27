import React from 'react'
import {Card} from "react-bootstrap";

class TemplateCard extends React.Component {

    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.props.data.info.icon} />
                <Card.Body>
                    <Card.Title>{this.props.data.info.name}</Card.Title>
                    <Card.Text>
                        {this.props.data.info.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
        )
    }
}

export default TemplateCard