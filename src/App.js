import React ,{Component} from 'react';
import './App.css';
import {csv} from'd3';
import data from './restaurants.csv';

import TextField from '@material-ui/core/TextField';
import RestroCard from './components/restroCards';
import NavBar from './components/navBar';

import Button from '@material-ui/core/Button';


class App extends Component {
 state={
   query:"",
   cuisines:"",
   details:[],
   sortPrice:"ASC",
   sortName:"A-Z",
   sortRating:"ASC",
   sortVote:"ASC",
   

 }
  componentDidMount()
  {
     
    csv(data)
    .then(data=>{this.setState({details:data});});
  }
  findRestaurant(event)
  {
  this.setState({
    query:event.target.value,
    filterByCuisine:"no",
    filterByName:"yes"
  })
  console.log(this.state.query);
  }

  findCuisines(event)
  {
  this.setState({
    cuisines:event.target.value,
    filterByCuisine:"yes",
    filterByName:"no"
  })
  console.log(this.state.cuisines);
  }

  showDetails(item)
  { //Restaurant ID,Restaurant Name,Cuisines,Average Cost for two,Currency,Has Table booking,Has Online delivery,Aggregate rating,Rating color,Rating text,Votes
    alert(`
    Restaurant Name: ${item["Restaurant Name"]}
    Restaurant ID: ${item["Restaurant ID"]}
    Cuisines: ${item["Cuisines"]}
    Average Cost for two: ${item["Average Cost for two"]}
    Currency: ${item["Currency"]}
    Has Table booking: ${item["Has Table booking"]}
    Has Online delivery: ${item["Has Online delivery"]}
    Aggregate rating: ${item["Aggregate rating"]}
    Rating color: ${item["Rating color"]}
    Rating text: ${item["Rating text"]}
    Votes: ${item["Votes"]}
    `);
  }
  

  handleSort (event)  
  {
    
    var isReversed = (this.state.sortName === "A-Z") ? 1 : -1  ;
    if(this.state.sortName === "A-Z")
    this.setState({
      sortName: "Z-A",
      details: this.state.details.sort((a,b)=>{
                return isReversed * a["Restaurant Name"].localeCompare(b[["Restaurant Name"]])
              })
    })
    else
    this.setState({
      sortName: "A-Z",
      details: this.state.details.sort((a,b)=>{
                return isReversed * a["Restaurant Name"].localeCompare(b[["Restaurant Name"]])
              })
    })
     
  }
  
  handlePriceSort (event)  
  { 
  var byPrice = event.state.details.slice(0);
  byPrice.sort(function(a,b) {  return parseInt(a["Average Cost for two"]) - parseInt(b["Average Cost for two"])});
// console.log(byPrice)
    if(this.state.sortPrice === "ASC")
    { 
      this.setState({
      sortPrice: "DESC",
      details: byPrice.sort((a,b)=>{
              return parseInt(a["Average Cost for two"]) - parseInt(b["Average Cost for two"])
              })
       
      })
    }
    else
      this.setState({
      sortPrice: "ASC",
      details: byPrice.sort((a,b)=>{
                return parseInt(b["Average Cost for two"]) - parseInt(a["Average Cost for two"])
                })
       
    })
     
  }

  handleRateSort (event)  
  { 
  var byRate= event.state.details.slice(0);
  byRate.sort(function(a,b) {  return parseInt(a["Aggregate rating"]) - parseInt(b["Aggregate rating"])});
// console.log(byRate)
    if(this.state.sortRating === "ASC")
    { 
      this.setState({
        sortRating: "DESC",
        details: byRate.sort((a,b)=>{
              return parseFloat(a["Aggregate rating"]) - parseFloat(b["Aggregate rating"])
              })
       
      })
    }
    else
      this.setState({
        sortRating: "ASC",
        details: byRate.sort((a,b)=>{
                return parseFloat(b["Aggregate rating"]) - parseFloat(a["Aggregate rating"])
                })
       
    })
     
  }

  handleVoteSort (event)  
  { 
  var byVote= event.state.details.slice(0);
  byVote.sort(function(a,b)  {  return parseInt(a["Votes"]) - parseInt(b["Votes"])});
// console.log(byVote)
    if(this.state.sortVote === "ASC")
    { 
      this.setState({
        sortVote: "DESC",
        details: byVote.sort((a,b)=>{
              return parseInt(a["Votes"]) - parseInt(b["Votes"])
              })
      })
    }
    else
      this.setState({
        sortVote: "ASC",
        details: byVote.sort((a,b)=>{
                return parseInt(b["Votes"]) - parseInt(a["Votes"])
                })
    })
     
  }

  render() {
    const { details, sortPrice , sortName} = this.state;
    
    return (
    <div className="App"><NavBar/>
       
       <br/>
     <TextField onChange={event => this.findRestaurant(event)}  id="outlined-basic" label="Restaurants" variant="outlined" />&nbsp;&nbsp;
    
      <TextField   onChange={event => this.findCuisines(event)} id="outlined-basic" label="Cuisines" variant="outlined" /><br/>

       <br/>
      <Button style={{backgroundColor:"#61dafb"}}  m={1} p={20} onClick={()=>this.handleSort()}> SORT BY Name {this.state.sortName}</Button> &nbsp;&nbsp;

      <Button style={{backgroundColor:"#61dafb"}} className="button" onClick={(e)=>this.handlePriceSort(this,e)}>SORT BY Price  {this.state.sortPrice}</Button>&nbsp;&nbsp;

      <Button style={{backgroundColor:"#61dafb"}} className="button" onClick={(e)=>this.handleRateSort(this,e)}>SORT BY Rating  {this.state.sortRating}</Button>&nbsp;&nbsp;

      <Button style={{backgroundColor:"#61dafb"}} className="button" onClick={(e)=>this.handleVoteSort(this,e)}>SORT BY Votes  {this.state.sortVote}</Button><br/>

       
       {this.state.details
       .filter((restaurant)=>{
              return restaurant["Restaurant Name"]
              .toLowerCase()
              .indexOf(this.state.query.toLowerCase())!==-1  
            &&
            restaurant["Cuisines"]
              .toLowerCase()
              .includes(this.state.cuisines.toLowerCase())  

            }  )  
       .map((restaurant) =>
       <div  onClick={this.showDetails.bind(this,restaurant)}>
       <RestroCard data={restaurant}> {restaurant["Restaurant Name"]} </RestroCard>
       </div>
    
         )
         
         }
    </div>
  )
  
}
}
export default App;
