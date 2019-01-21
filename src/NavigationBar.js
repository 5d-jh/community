import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar color="light">
                <NavbarBrand href="/">Community</NavbarBrand>
            </Navbar>
        )
        
    }
}