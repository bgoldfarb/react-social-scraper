import React, { Component } from "react";

class PopularLatestToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);

  };

  render() {
    return (
      <div className="drawer-element wipAppToggle">
        <label className="drawer-option">
          <input
            type="radio"
            value="popular"
            checked={this.props.popularOrLatest === "popular"}
            onChange={this.handleChange}
          />
          Popular
        </label>
        <label className="drawer-option">
          <input
            type="radio"
            value="latest"
            checked={this.props.popularOrLatest === "latest"}
            onChange={this.handleChange}
          />
          Latest
        </label>
      </div>
    );
  }
}

export default PopularLatestToggle;
