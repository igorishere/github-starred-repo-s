import Reactotron from "reactotron-react-native";


if( __DEV__ ){
    const reactotron = Reactotron
    .configure(
        {
            //IP da máquina de desenvolvimento
            host: '192.168.0.103'
        }
    )
    .useReactNative()
    .connect();

    console.tron = reactotron;

    reactotron.clear();
}
