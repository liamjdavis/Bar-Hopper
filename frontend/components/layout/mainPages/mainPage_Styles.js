import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 4,
        alignItems: 'center',
        paddingRight: '12.5%',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    subHeaderText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
    },
    map: {
        marginTop: 25,
        width: '100%',
        height: '75%',
    },
    profilePageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePictureContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePicture: {
        width: '30%',
        aspectRatio: 1,
    },
    profileAttributesContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    attributeText: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black',
    },
});