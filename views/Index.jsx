const React = require('react');
const AppLayout = require('./layout/AppLayout.jsx');

class Index extends React.Component {
    render() {
        return (
            <AppLayout title="Fruits Index Page">
                
                {this.props.fruits.map((fruit,i) => {
                    return <p>
                        <h2><a href={`/fruits/${fruit.id}`}>{fruit.name}</a></h2>
                        <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                        <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                          <input type="submit" value="DELETE"/>
                        </form>
                    </p>
                })}
            </AppLayout>
        )
    }
}

module.exports = Index;