import React, {useState, useEffect} from 'react'
import { Grommet, Box, TextInput ,Button, Heading, Grid} from 'grommet';
import { useHistory } from 'react-router-dom';

// connect to database?
const DUMMY_DATA = [
    {
        senderId: 'Aaron',
        text: 'Hey'
    },
    {
        senderId: 'Abhi',
        text: 'Hi'
    },
    {
        senderId: 'Abhi',
        text: 'Hi'
    },
    {
        senderId: 'Abhi',
        text: 'Hi'
    },
    {
        senderId: 'Abhi',
        text: 'Hi'
    },
    
    
]

let endPoint = "http://localhost:5000";
let socket = window.io.connect(`${endPoint}`);


// class main extends React.Component {

//     render(){
const Main = (state) => {
    const [message, setMessage] = React.useState('');
    const [user, setUser] = React.useState('Aaron');
    const [messages, setMessages] = React.useState(DUMMY_DATA);
    const history = useHistory();

    const logout = () => {
        fetch('/logout').then(res => res.json()).then(data => {
            history.push(`/login`)
        });
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        
        socket.emit("message", message);
        setMessage((message) => "");
    }

    useEffect(() => {
        console.log(state.props);
        socket.on("message", msg => {
            setMessages([...messages, {senderId: user, text: msg}]);
            // console.log(JSON.stringify({messages}));
        }); 

        fetch("/main").then(response => response.json()).then(data => {
            if (data.redirect !== false) {
                
            } else {

            }
          });

        return () => {
            socket.off("message");
        };
    }, [messages.length]);

    const tempChange = () => {
        console.log("change id");
    }
    
    
    return(
        <Grommet>
            <Box fill background="#3279a8" >
                <Grid
                    fill rows={["auto", "flex"]}
                    columns={["auto", "flex"]}
                    gap="small"
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'chats', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] }
                    ]}

                >
                <Box
                direction="column"
                gridArea = "header"
                align="center"
                justify="around"
                fill="horizontal"
                pad={{ right: "xsmall", left: "xsmall" }}
                >
                <Heading margin="medium" alignSelf="center" level='1' color="white">Chats</Heading>
                
                <Button primary label="Logout" color = "#098589" onClick={logout} />
                </Box> {/* end header box */}
                <Box
                background="white" 
                margin={{ left: "xlarge",top: "small" }} 
                gridArea="chats" justify="start" 
                align="center" 
                width="medium" 
                height="medium" 
                direction="column" 
                pad="medium" 
                round="small" 
                border={{ color: 'white', size: 'large' }}>
                    <Heading margin="medium" alignSelf="start" level='2'>List of Chats</Heading>
                    <TextInput
                            style = {{width:'100%'}}
                            placeholder = {user}
                            size = "small"
                            value={user}
                            onChange={event => {setUser(event.target.value)}}
                        />
                        <Button primary label="tempChangeUser" color = "#098589" onClick={tempChange} />


                </Box> {/* end of list of chats */}
                <Box
                
                gridArea = "main"
                alignContent = "end"
                justify = "end"
                background = "white"
                margin={{ right: "xlarge",top: "small" }} 
                round = "small"
                > 
                    <Box className="message-list" height="medium">
                    {messages.map((message, index) => {
                        return(
                            // use unique key instead of index later on
                            <Box key={index} className="message" pad="small" width="small">
                                <div className="message-username">{message.senderId}</div>
                                <div className="message-text">{message.text}</div>
                            </Box>
                        )
                        
                    })}
                    </Box>
                   
                    <Box width="large" direction="row" pad ='small'>
                    <TextInput
                            style = {{width:'100%'}}
                            placeholder="message"
                            size = "small"
                            value={message}
                            onChange={event => {setMessage(event.target.value)}}
                        />
                        <Button primary label="Send" color = "#098589" onClick={handleSubmission} />

                    </Box>
                       
                      
                   
                </Box>
                </Grid>
            </Box>
        </Grommet>
        
    )
}

export default Main;