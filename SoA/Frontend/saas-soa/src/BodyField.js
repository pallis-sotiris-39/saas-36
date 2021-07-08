import React from 'react';

class BodyField extends React.Component{

      render(){
          return(
              <div className="inputField">

                  <textarea
                      className = "body"
                      cols="50"
                      rows="10"
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      onChange={(e) => this.props.onChange(e.target.value)}
                  />
              </div>
            );


      }

}

export default BodyField;
