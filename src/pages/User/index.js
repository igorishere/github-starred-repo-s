import React, { Component } from "react";
import api  from "../../services/api";

/** Import do estilo da aplicação */
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    Owner,
    Info,
    Title,
    Author
} from './styles'

export default class User extends Component{

    //Estado da tela
    state ={
        stars:[]
    }
     //ação executado toda vez que a tela é iniciada
     async componentDidMount(){

            const userData = this.props.route.params.user;
            const response =  await api.get(`/users/${userData.login}/starred`);
            this.setState({stars: response.data})

            console.tron.log(this.state);

    }

    render(){
        const { stars } = this.state;
        const { user } =  this.props.route.params;
        return (
            <Container>
                <Header>
                    <Avatar source={ {uri: user.avatar} } />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                <Stars
                    data={stars}
                    keyExtractor={ star => String(star.id) }
                    renderItem={ ( {item} )=>(
                        <Starred>
                            <Owner source={{uri: item.owner.avatar_url}}/>
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    ) }
                />
            </Container>
            )
    }
}

