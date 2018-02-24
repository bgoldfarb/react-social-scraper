import React, { Component } from "react";

class FavoritesToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  sortData = () => {
    let result = {};
    this.props.data.forEach((key, i) => result[key] = this.props.favorites[i]);
    let keysSorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]})
    this.props.filterByFavorites(keysSorted,this.props.favorites.sort((a, b)=> b - a))
  }




  render() {
    return (
      <div>
          <button onClick={() => this.sortData()} > Filter by Favorites </button>
      </div>
    )
  }
}

export default FavoritesToggle;
