import React from "react";
import { Button,Tabs,Tab,Row,Col,Table,Image,InputGroup,FormControl,OverlayTrigger,Tooltip,Form} from "react-bootstrap";
import axios from "axios";

class TemplateInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            envs: {},
            storage: {},
            network:{},
            name: ""
        }
    }

    doInstall = () => {
        //Setup
        let applicationRequestBody = {}
        let envsBody = []
        let storageBody = []
        let networkBody = []

        // Envs
        for (const[env,value] of Object.entries(this.state.envs)){
            envsBody.push({"Variable": env,"Value": value})
        }

        // Storage
        for (const[storage,value] of Object.entries(this.state.storage)){
            storageBody.push({"Location": storage,"Value": value})
        }

        //Network
        for (const[port_type,value] of Object.entries(this.state.network)){
            const splitResult = port_type.split('/')
            const port = splitResult[0]
            const type = splitResult[1]
            networkBody.push({"Type": type,"Port":parseInt(port),"Value":parseInt(value)})
        }

        applicationRequestBody = {
            "Env": envsBody,
            "Data": storageBody,
            "Network": networkBody,
            "Name": this.state.name,
            "TemplateId": -1
        }

        //Add template
        axios.post(process.env.REACT_APP_API_SERVER.concat("/templates?marketplace="+this.props.marketplace_id+"&template_id="+this.props.data.info.id))
            .then(function (response) {
                applicationRequestBody['TemplateId'] = response.data.id
                axios.post(process.env.REACT_APP_API_SERVER.concat("/applications"),applicationRequestBody)
                    .then(result => {
                        alert("Success!")
                    })

        })
            .catch(function (error) {
                console.error(error);
            });







    }

    handleChangeName = (event) => {
        let new_name = event.target.value
        this.setState({
            name: new_name
        })
    }

    handleChangeEnvs = (event) => {
        let new_envs = this.state.envs
        new_envs[event.target.id] = event.target.value
        this.setState({
            envs: new_envs
        })
    }

    handleChangeStorage = (event) => {
        let new_storage = this.state.storage
        new_storage[event.target.id] = event.target.value
        this.setState({
            storage: new_storage
        })
    }

    handleChangeNetwork = (event) => {
        let new_network = this.state.network
        new_network[event.target.id] = event.target.value
        this.setState({
            network: new_network
        })
    }

    renderEnvSections(){
        if(this.props.data.env.length === 0){
            return <tr><td>No configurable variables.</td></tr>
        }
        return this.props.data.env.map((env) =>
            <tr key={env.variable}>
                <td>
                    <OverlayTrigger placement={'left'}
                        overlay={
                            <Tooltip id={env.variable}>
                                {env.variable}
                            </Tooltip>
                        }
                    ><h6>{env.name}</h6></OverlayTrigger>
                    <p>{env.description}</p>
                    <InputGroup>
                        <FormControl
                            id = {env.variable}
                            onChange={this.handleChangeEnvs}
                        />
                    </InputGroup>
                </td>
            </tr>
        )
    }

    renderStorageSections(){
        if(this.props.data.data.length === 0){
            return <tr><td>No configurable storages.</td></tr>
        }
        return this.props.data.data.map((data) =>
            <tr key={data.location}>
                <td>
                    <OverlayTrigger placement={'left'}
                                    overlay={
                                        <Tooltip id={data.location}>
                                            {data.location}
                                        </Tooltip>
                                    }
                    ><h6>{data.name}</h6></OverlayTrigger>
                    <p>{data.description}</p>
                    <InputGroup>
                        <FormControl
                            id = {data.location}
                            onChange={this.handleChangeStorage}
                        />
                    </InputGroup>
                </td>
            </tr>
        )
    }

    renderNetworkSections(){
        if(this.props.data.network.length === 0){
            return <tr><td>No configurable network settings.</td></tr>
        }
        return this.props.data.network.map((network) =>
            <tr key={network.name}>
                <td>
                    <OverlayTrigger placement={'left'}
                                    overlay={
                                        <Tooltip id={network.name}>
                                            {network.port}
                                        </Tooltip>
                                    }
                    ><h6>{network.name}</h6></OverlayTrigger>
                    <p>{network.description}</p>
                    <InputGroup>
                        <FormControl
                            id = {network.port.toString()+"/"+network.type.toString()}
                            onChange={this.handleChangeNetwork}
                        />
                    </InputGroup>
                </td>
            </tr>
        )
    }


    render() {
        return(
            <>
                <Row>
                    <Col>
                        <Tabs defaultActiveKey="info">
                            <Tab eventKey="info" title="Info">

                                <Row><Col><Image src={this.props.data.info.icon} /></Col></Row>
                                <Row>
                                    <Col>
                                        <Table bordered>
                                            <tbody>
                                            <tr>
                                                <td><strong>Name</strong></td>
                                                <td>{this.props.data.info.name}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Description</strong>
                                                </td>
                                                <td><p>
                                                    {this.props.data.info.description}
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Version</strong></td>
                                                <td>{this.props.data.info.version}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Image</strong>

                                                </td>
                                                <td>
                                                    {this.props.data.info.image}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="env" title="Variables" style={{'marginBottom': 10}}>
                                <Table bordered  style={{'marginBottom': -1}}>
                                    <tbody>
                                    {this.renderEnvSections()}
                                    </tbody>

                                </Table>

                            </Tab>
                            <Tab eventKey="data" title="Storage" style={{'marginBottom': 10}}>
                                <Table bordered  style={{'marginBottom': -1}}>
                                    <tbody>
                                    {this.renderStorageSections()}
                                    </tbody>

                                </Table>
                            </Tab>
                            <Tab eventKey="network" title="Network">
                                <Table bordered  style={{'marginBottom': -1}}>
                                    <tbody>
                                    {this.renderNetworkSections()}
                                    </tbody>

                                </Table>
                            </Tab>
                        </Tabs>
                    </Col>

                </Row>
                <Row style={{'marginBottom': 10}}>
                    <Col>
                        <Form>
                            <Form.Label>Application Name</Form.Label>
                            <FormControl onChange={this.handleChangeName} />
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={this.doInstall} variant="success" block>Install</Button>
                    </Col>

                </Row>
            </>
        )
    }
}
export default TemplateInfo;