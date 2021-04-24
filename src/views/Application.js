import React from "react";
import {Col, Container, Row, Table,Badge,Button,ButtonGroup} from "react-bootstrap";
import axios from "axios";
class Application extends React.Component {
    render() {
        return (
            <Container>
                <Row style={{'marginTop': 30}}>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTable()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        )
    }

    renderTable() {
        if(this.state.applications.length === 0){
            return(
                <tr>
                    <td>No data</td>

                </tr>
            )
        }else
        {
            return (
                this.state.applications.map((application) =>
                    <tr key={application.name}>
                        <td><strong>{application.name}</strong></td>
                        <td><Badge variant={application.status === 'running'?"success":"danger"}>{application.status}</Badge></td>
                        <td>
                            <Row>
                                <Col>
                                    <ButtonGroup><Button size="sm" variant="success">Start</Button>
                                        <Button size="sm" variant="danger">Stop</Button></ButtonGroup>

                                </Col>
                            </Row>
                        </td>
                        <td>
                            <Button size="sm" variant="info">Detail</Button>
                            <Button size="sm" variant="danger">Delete</Button>
                        </td>
                    </tr>
                )
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            applications: [
            ],
    }
}
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_SERVER.concat("/applications")).then(
            (response) => {
                this.setState({
                    applications: response.data
                })
            }
        )
    }
}

export default Application;