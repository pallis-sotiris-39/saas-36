import React from 'react';

class TitleField extends React.Component{

      render(){
          return(
              <div className="inputField">

                  <input
                      className='title'
                      type={this.props.type}
                      value={this.props.value}
                      onChange={(e) => this.props.onChange(e.target.value)}
                  />
              </div>
            );


      }

}

export default TitleField;
