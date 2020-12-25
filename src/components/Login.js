import React, { useEffect } from 'react';

import { Box, Heading, TextInput, Button, Text, Grommet, Grid} from 'grommet';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

let endPoint = "http://localhost:5000";
let socket = window.io.connect(`${endPoint}`);


const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [currentTime, setCurrentTime] = React.useState(0);
    const history = useHistory();

    // weird typecasting
    let loggedIn = props.state.loggedIn && props.state.loggedIn !== 'false';

    useEffect(() => {
        let mounted = true;
        if (loggedIn) {
            mounted = false;
        }
        fetch('/time').then(res => res.json()).then(data => {
            if (mounted) {
                setCurrentTime(data.time);
            }
        });
        console.log(props);
        return () => {
            return mounted; // cleanup fct
        }
      }, []);
    
    if (loggedIn) {
        return <Redirect to = "/main" />
    }

    /**
     * Send post request to server to log in.
     */
    const handleSubmission = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept':'application/json' },
            body: JSON.stringify({ name: email, pass: password})
        };
        console.log(JSON.stringify({ email, password }));
        fetch("/login", requestOptions).then(response => response.json()).then(data => {
            if (data.session_id !== false) {
                props.handleLogin({ name: email, pass: password, loggedIn: true});
                history.push(`/main`);
            } else {
                alert('login info incorrect');
            }
          });

        
    };
    

    return (
        <Grommet>
            <Box fill background="#3279a8">
                <Grid
                     fill rows={["auto", "flex"]}
                     columns={["auto", "flex"]}
                     gap="small"
                     areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'login', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] }
                     ]}

                >
                <Box
                direction="row"
                gridArea = "header"
                align="center"
                justify="around"
                fill="horizontal"
                border={"bottom", { size:'medium', side:'bottom'}}
                pad={{ right: "xsmall", left: "xsmall" }}
                >
                <Heading margin="medium" alignSelf="start" level='1' color="white">Chat App</Heading>
                
                </Box> {/* end header box */}
                    <Box  
                    background="white" 
                    margin={{ left: "xlarge",top: "large" }} 
                    gridArea="login" justify="start" 
                    align="center" 
                    width="medium" 
                    height="large" 
                    direction="column" 
                    pad="medium" 
                    round="small" 
                    border={{ color: 'white', size: 'large' }} >
                        <Heading margin="none" level="3" alignSelf="start">Login</Heading>
                        <br />
                        <Box width="medium">
                            <TextInput
                                placeholder="email"
                                value={email}
                                type="email"
                                name = "username"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Box>
                        <br />
                        <Box width="medium">
                            <TextInput
                                placeholder="password"
                                value={password}
                                type="password"
                                name = "password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Box>
                        <br />
                        <Box width="medium" direction = "row" >

                            <Button primary label="Login" color = "#098589" onClick={handleSubmission} />
                        </Box>
                        <hr />
                        <Text alignSelf="start">Don't have an account? <a href="/signup" >Sign up</a></Text>
                        <p> current time is {currentTime}</p>
                    </Box> {/* end login box */}
                    <Box
                    gridArea = "main"
                    alignContent = "end"
                    justify = "end"
                    direction = "row"
                    >  
                    </Box>
                </Grid>
            </Box>
        </Grommet>
    )
}

export default Login;