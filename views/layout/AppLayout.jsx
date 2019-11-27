// This adds react to our file
const React = require('react');

class AppLayout extends React.Component{
 
  render() {
    return (
      <html lang="en" dir="ltr">
        <head>
        {/* charset needs to be Camel Cased in JSX */}
            <meta charSet="utf-8"/>
        {/* This let us dynamically create the title */}
            <title>{this.props.title}</title>
            <link rel="stylesheet" href="/css/style.css"/>
        </head>
        <body>
        <nav>
             <a href="/fruits/new">Create a New Fruit</a>
          </nav>
        <h1>{this.props.title}</h1>
       {/* This is where our other components will be injected */}
          {this.props.children}
        </body>
    </html>
    )
  }
}
module.exports = AppLayout;