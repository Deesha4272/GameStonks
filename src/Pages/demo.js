import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Assessment from '@material-ui/icons/Assessment';
import BubbleChart from '@material-ui/icons/TrendingUp';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Chat from '@material-ui/icons/Chat';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './demo.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
import history from './history.js';
import { TrendingUp } from '@material-ui/icons';
import $ from "jquery";
import Chart from 'chart.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '70%',
    position: 'absolute', left: '15%', right: '15%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);
  console.log("...", data)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {

      var settings = {
        "url": "https://cors-anywhere.herokuapp.com/34.70.245.51:8080/api/stocks",
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("useEffect being called, ajax");
        setData(response)
      });


   }, [setData]);

   let commentSection = undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" style={{backgroundColor: "pink"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          AlignItems="center"
          textAlign='center'
          style={{backgroundColor: "pink"}}
        >
           <Typography variant="h3" color="white">GameStonks</Typography>
          <Tab label="Trending" icon={<TrendingUp />} {...a11yProps(0)} />
          <Tab label="My Stocks" icon={<Assessment />} {...a11yProps(1)} />
          <Tab label="Community" icon={<Chat />} {...a11yProps(2)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <p class="center">Welcome Deesha! </p>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div class="center dash"> 
      {/* <canvas id="myChart" width="400" height="400"></canvas>
        <script>
        var ctx = document.getElementById('myChart');
        var myChart = new new Chart(ctx, {
            data: data,
            type: 'polarArea',
            options: options
        });
        </script> */}
          <h5> Trending Stocks</h5>
         {/* {data[0]} */}
         {data.map((input, key) => {
            return (
              <div key={key} class ="rounded">
                
                <b>{input.stock.ticker_symbol}</b>
                {input.comments && input.comments.map((input2, key2) => {
                  return (
                    <div key={key2} class="post">
                      
                      <user> <b>{input2.commenter}</b> </user> 
                      <date> &nbsp; at {input2.date}</date> <br></br>
                      {input2.comment} 
                      
                    </div>
                  );
                })}
                
              </div>
              
            );
          })}
          <br></br>
          
          <z><br></br></z> 


      </div>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
        <b style={{ color: 'white' }}> Your Top Stocks </b>
                <p style={{ color: 'white' }}> 1. GameStop 25.5%&#8679;</p>
                <p style={{ color: 'white' }}> 2. Google 10.2%&#8679;</p>
                <p style={{ color: 'white' }}> 3. Amazon 8.2%&#8681;</p>

        <p></p>
        <Button variant="btn btn-success" onClick={() => {history.push('/page3'); window.location.reload();}}>Enter</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div>
      <div class="embed-container"><iframe width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="COVID-19 Incidence Rate Per 100,000 by Census Tract - 2021/01/10 to 2021/01/16 (Mobile)" src="//www.arcgis.com/apps/Embed/index.html?webmap=5989e7d6f0e9424494b2a2a68bad8ae1&extent=-80.4965,43.4261,-78.9928,44.059&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light"></iframe></div>
      </div>
      </TabPanel> 
    </div>
  );
}
