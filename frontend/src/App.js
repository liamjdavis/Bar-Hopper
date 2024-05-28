import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/')
            .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <View>
            <Text>{data ? data.message : 'Loading...'}</Text>
        </View>
    );
};

export default App;
