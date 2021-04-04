import React from 'react'
import {Card, Button, Modal} from "react-bootstrap";
import TemplateInfo from "./TemplateInfo";

class TemplateCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    };

    handleHide = () => {
        this.setState({
            show: false
        })
    };


    render() {
        return (
            <>
            <Card>
                <Card.Img variant="top" src={this.props.data.info.icon} />
                <Card.Body>
                    <Card.Title>{this.props.data.info.name}</Card.Title>
                    <Card.Text>
                        {this.props.data.info.description.slice(0,200)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="success" onClick={this.handleShow}>Install</Button>
                </Card.Footer>
            </Card>
            <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.data.info.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TemplateInfo data={this.props.data}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default TemplateCard