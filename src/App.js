import React, { Component } from 'react';
import './App.css';
import TwitterScraper from '../src/TwitterScraper'
import PopularLatestToggle from '../src/PopularLatestToggle'

class App extends Component {

  constructor(props){
    super(props)
      this.state = {
       queryParam: '',
       tweet: '',
       showTweets: false,
       queryData: [],
       name: [],
       count : 0,
       nameToShow: '',
       favoriteCount: [],
       popularOrLatest: 'popular',
       followers: []
      }
    }
    handleChange = (event) => {
      this.setState(
        {queryParam: event.target.value,
        showTweets: false})
    }

    handleSubmit = (e) => {
       this.setState({queryParam: this.state.queryParam})
       if(!this.state.showTweets){
         this.setState({showTweets:true})
       }
       else{
        this.setState({showTweets:false})
       }
    }

    handleClear = (e) => {
      this.setState({    
        tweet: '',
        showTweets: false,
        queryData: [],
        name: [],
        count : 0,
        nameToShow: '',
        favoriteCount: []
       })
    }
    

    addToQueryData = (data, name, length, favoriteCount, followers) => {
      this.setState({
        queryData: this.state.queryData.concat(data),
        name: this.state.name.concat(name), 
        count: length,
        showTweets: false,
        favoriteCount: this.state.favoriteCount.concat(favoriteCount),
        followers: this.state.followers.concat(followers)
      })
    }
  
    showResults = () => {
      return(
        <div>
         <span>{this.state.queryData.map((i, index) => <p className = "results"> <div key = {i} className = {`twitter-results-${i.includes('RT') ? 'rt' : 'normal'}`}>{index+1 + " : " + i} <p className = "favorites">Favorites: {this.state.favoriteCount[index]} </p></div> <p className= "twitter-name" key = {index}> {this.state.name[index]}....Followers: {(this.state.followers[index])}</p> </p>)} </span>
         <br />
         <span> The Count is: {this.state.count} </span>
        </div>
      )
    }

    updatePopularOrLatest = (popularOrLatest) => {
      this.setState({ popularOrLatest })
    }

 

  render() {
    return (
      
    <div className = 'wrapper'>
      <div className = "main-title">
        <h1>Twitter-Scraper</h1>
      </div>
      <p> Please Enter your query param </p>
        Search For: <input id="user-input-value" value = {this.state.queryParam} onChange = {this.handleChange}/>
      <button className = 'submit-button' onClick ={this.handleSubmit}>Submit</button>
      <button className = 'clear-button' onClick ={this.handleClear}>Clear</button>
      <PopularLatestToggle onChange={this.updatePopularOrLatest} popularOrLatest={this.state.popularOrLatest} />
      <TwitterScraper tweet={this.state.queryParam} showTweets={this.state.showTweets} queryData={this.addToQueryData} popularOrLatest={this.state.popularOrLatest}/>
         {this.showResults()}
    </div>
    );  
  }
}

export default App;


