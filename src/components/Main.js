import React from 'react'
import { Grommet, Box, TextInput ,Button, Heading, Grid} from 'grommet';


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

// class main extends React.Component {

//     render(){
const Main = () => {
    const [message, setMessage] = React.useState('');

    const handleSubmission = async () => {
        console.log(JSON.stringify({ message }));
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
                direction="row"
                gridArea = "header"
                align="center"
                justify="around"
                fill="horizontal"
                pad={{ right: "xsmall", left: "xsmall" }}
                >
                <Heading margin="medium" alignSelf="start" level='1' color="white">Chats</Heading>
                
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
                    {DUMMY_DATA.map((message, index) => {
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
                            onChange={event => setMessage(event.target.value)}
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