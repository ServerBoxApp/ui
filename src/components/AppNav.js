import React from 'react'
import {Navbar, Nav} from "react-bootstrap";

class AppNav extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#">ServerBox</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#application">Application</Nav.Link>
                    <Nav.Link href="#marketplace">Marketplace</Nav.Link>
                </Nav><Nav>
                <Nav.Link href="#about">About</Nav.Link>
            </Nav>
            </Navbar>
        )
    }
}

export default AppNav