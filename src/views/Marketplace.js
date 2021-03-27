import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import MarketplaceTab from "../components/MarketplaceTab";
class Marketplace extends React.Component {
    render() {
        return (
            <Container>
                <Row style={{'marginTop': 30}}>
                    <Col>
                        <MarketplaceTab/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Marketplace