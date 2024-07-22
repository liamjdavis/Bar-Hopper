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
        padding: 16,
        justifyContent: 'flex-start',
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: '#808080',
        resizeMode: 'cover',
    },
    changeProfileButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    profileAttributesContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    attributeText: {
        fontSize: 24,
        marginVertical: 8,
    },
    logoutButton: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    changeProfileButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    changeProfileButtonText: {
        color: '#fff',
        fontSize: 18,
    },

});