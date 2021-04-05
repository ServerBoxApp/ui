import React from 'react'
import {CardDeck, Col, Nav, Row, Tab} from "react-bootstrap";

import TemplateCard from "./TemplateCard";
class MarketplaceTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_SERVER.concat("/marketplaces"))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        marketplaces_config: result
                    });
                    this.setState({marketplaces_data: {}})
                    result.forEach(marketplace => {
                        fetch(marketplace.url).then(res => res.json())
                                .then((result) => {
                                        const new_marketplaces_data = this.state.marketplaces_data
                                        new_marketplaces_data[marketplace.id] = result
                                        this.setState({
                                            marketplaces_data: new_marketplaces_data
                                        })
                                })
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    render_menu() {
        if (this.state.marketplaces_config) {
            return this.state.marketplaces_config.map((marketplace) =>
                <Nav.Item key={marketplace.id}>
                    <Nav.Link eventKey={marketplace.id.toString()}>{marketplace.name}</Nav.Link>
                </Nav.Item>
            )
        }
    }

    render_cards(){
        if(this.state.marketplaces_data && Object.keys(this.state.marketplaces_data).length !== 0){
            return this.state.marketplaces_config.map((marketplace) =>
                <Tab.Pane key={marketplace.id} eventKey={marketplace.id.toString()}>
                    <CardDeck>
                        {Object.keys(this.state.marketplaces_data[marketplace.id]).map((id) =>
                        <TemplateCard key={id} marketplace_id={marketplace.id} data={this.state.marketplaces_data[marketplace.id][id]}/>
                    )}

                    </CardDeck>
                </Tab.Pane>
            )
        }
    }

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            {this.render_menu()}
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            {this.render_cards()}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}

export default MarketplaceTab