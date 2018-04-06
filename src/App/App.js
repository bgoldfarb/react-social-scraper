import React, { Component } from 'react';
import '../App/App.css'
import {twitterSearch} from '../../src/TwitterScraper/TwitterScraper'
import PopularLatestToggle from '../../src/PopularLatestToggle/PopularLatestToggle'

class App extends Component {

  constructor(props){
    super(props)
      this.state = {
       queryParam: '',
       tweet: '',
       queryData: [],
       name: [],
       count : 0,
       nameToShow: '',
       favoriteCount: [],
       popularOrLatest: 'popular',
       sortByFavorites: false,
       followers: [],
       caseSensitive: false
      }
    }
    handleChange = (event) => {
      this.setState(
        {queryParam: event.target.value})
    }

    handleSubmit = (e) => {
       this.setState({queryParam: this.state.queryParam})
       this.setState({caseSensitive: false})
       twitterSearch(this.state.queryParam, this.state.queryData)
       this.showResults()
    }

    handleCaseSensitiveSubmit = (e) => {
      this.setState({queryParam: this.state.queryParam})
      this.setState({caseSensitive: true})
      twitterSearch(this.state.queryParam, this.state.queryData)
      this.showResults()
   }

    handleClear = (e) => {
      this.setState({    
        tweet: '',
        queryData: [],
        name: [],
        count : 0,
        nameToShow: '',
        favoriteCount: [],
        caseSensitive: false
       })
    }
    

    addToQueryData = (data, name, length, favoriteCount, followers) => {
      this.setState({
        queryData: this.state.queryData.concat(data),
        name: this.state.name.concat(name), 
        count: length,
        favoriteCount: this.state.favoriteCount.concat(favoriteCount),
        followers: this.state.followers.concat(followers)
      })
    }
  
    showResults = () => {
      return(
        <div>
         <span>{this.state.queryData.map((i, index) =>  <p className = "results"> <div key = {i} className = {`twitter-results-${i.includes('RT') ? 'rt' : 'normal'}`}>{index+1 + " : " + i} <p className = "favorites">Favorites: {this.state.favoriteCount[index]}  </p></div> <p className= "twitter-name" key = {index}> {this.state.name[index]}....Followers: {(this.state.followers[index])}</p> </p>)} </span>
         <br />
         <span> The Count is: {this.state.count} </span>
        </div>
      )
    }

    updatePopularOrLatest = (popularOrLatest) => {
      this.setState({ popularOrLatest })
    }

    sortByFavorites = () => {
      this.setState({sortByFavorites : (!this.state.sortByFavorites ? true : false)})
    }

    highlightSearchParam = () => {
      {console.log(this.state.queryData)}
    }
 

  render() {
    return (
      
    <div className = 'wrapper'>
      <div className = "main-title">
        <h1>Twitter-Scraper</h1>
      </div>
      <p> Please Enter your query param </p>
        <div className = "user-input">Search For: <input id="user-input-value" value = {this.state.queryParam} onChange = {this.handleChange}/> </div>
      <div className = "buttons">
        <button className = 'submit-button' onClick ={this.handleSubmit}>Submit</button>
        <button className = 'submit-button-case' onClick ={this.handleCaseSensitiveSubmit}>Case Sensitive Submit</button>
        <button className = 'clear-button' onClick ={this.handleClear}>Clear</button>
        <button className = 'followers-button' onClick ={this.sortByFavorites}>Sort By Followers</button>
      </div>
    </div>
    );  
  }
}

export default App;


