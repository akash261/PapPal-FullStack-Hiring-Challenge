import React, { Component } from "react";
import { CardHeader, CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Rating from '@material-ui/lab/Rating';
import Chip from "@material-ui/core/Chip";
import { green } from '@material-ui/core/colors';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

//    const classes = useStyles();
   const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    
    green: {
      backgroundColor: green[500],
    },
  }));
class RestroCard extends Component {
  constructor(props) {
    super(props);

     
    
  }
  render() {
    var avatar = this.props.data.Cuisines.toString()[0];
    var cuisines = this.props.data.Cuisines.split(",");
    var cuisineList = cuisines.map(function(cuisine,index){
      return (
        <Chip key={index} style={{margin: '1% 0 5% 0'}}
        label={cuisine}
         />  
    );
}, this);
    
    return (
      <div className="box">
        <Card  style={{maxWidth: 600}} raised="true">
          <CardHeader
            title={this.props.data["Restaurant Name"]}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardContent>
            <strong>Price for two: {this.props.data["Average Cost for two"]} </strong>
                  <br/>
            <Chip style={{backgroundColor:this.props.data["Rating color"]}}
              label={this.props.data["Rating color"]}
            />
              
            <Chip
              avatar={<Avatar src={avatar} />}
              label={this.props.data["Aggregate rating"]}
            />
              <br/>
            
              {this.props.data.Cuisines !== '' && cuisineList}
             <br/>

            <ThumbsUpDownIcon/> {this.props.data.Votes}
            {/* <Rating name="half-rating-read" defaultValue={this.props.data["Aggregate rating"]} precision={0.1} readOnly /> */}

          </CardContent>
        </Card>
      </div>
    );
  }
}

export default RestroCard;
