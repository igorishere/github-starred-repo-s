import React,{ Component } from "react";
import PropTypes from "prop-types";
import {Keyboard, ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

/**Import dos ícones da aplicação */
import Icon  from 'react-native-vector-icons/MaterialIcons'
/** Import do estilo da aplicação */
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,

} from './styles'
/**Import da API */
import api from '../../services/api';

export default class Main extends Component{
    /**Declaração do estado do componente */
    state={
        loading: false,
        newUser:'',
        users:[

        ]
    }

    static propTypes ={
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired
    }

    //ação executado toda vez que a tela é iniciada
    async componentDidMount(){
        console.tron.log(this.props);

        /**
         * Quando iniciado a tela, vai buscar no
         * armazenamento interno do telefone e armazenar
         * isso em 'users'
         */
        const users  =  await AsyncStorage.getItem('users');

        /**Se 'users' não estiver vazia,o que tiver ali
         * vai ser salvo no estado do componente
        */

        if(users){
            this.setState( {users: JSON.parse(users)} );
        }
    }

    //ação executada toda vez que o componente é atualizado
     componentDidUpdate(_, prevState){
        const { users } = this.state;
        /**Verifica se o estado anterior(prevState)
         * é diferente do estado atual
         */
        if( prevState.users !== users ){
             AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    handleAddUser = async ()=>{
        //ativa o icone de loading no botao
        this.setState({loading: true})

        //desestruturando as variáveis do estado
        const {users,newUser} = this.state;

        //fazendo a requisição para a API
        const res = await api.get(`/users/${newUser}`);

        //ajustando o conteúdo da request
        const data={
            name: res.data.name,
            login: res.data.login,
            bio: res.data.bio,
            avatar: res.data.avatar_url,
        }

        //setando o valor que veio da API para o estado
        this.setState({
            users: [...users, data],
            newUser: '',
            loading: false
        })

        Keyboard.dismiss();
    }

    handleNavigate = ( user )=>{
        const { navigation } = this.props;


        navigation.navigate('User', {user});
    }

    render(){

        const {users,newUser,loading} = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autocorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({newUser: text})}
                        returnKeyType="send"
                        onSubmitEditing={ this.handleAddUser }
                    />
                    <SubmitButton
                        onPress={ this.handleAddUser }
                    >
                        {loading ? <ActivityIndicator color="#fff" /> : <Icon name="add" size={20} color="#fff" /> }

                    </SubmitButton>
                </Form>

                <List
                       // showsVerticalScrollIndicator={false}
                        data={ users }
                        keyExtractor={ user => user.login }
                        renderItem={  ({ item })=>(
                            <User>
                                <Avatar source={ {uri: item.avatar} } />
                                <Name>{item.name}</Name>
                                <Bio>{item.bio}</Bio>

                                <ProfileButton onPress={ () =>this.handleNavigate(item)}>
                                    <ProfileButtonText>Ver perfil</ProfileButtonText>
                                </ProfileButton>
                            </User>
                        )
                        }
                    />
            </Container>
            )
    }
}

