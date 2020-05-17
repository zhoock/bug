'use strict';


class Tagline extends React.Component {
    render() {
        return <h1>{this.props.name}</h1>; 
    }
}

const element = <Tagline name="Гранж жив" />;

ReactDOM.render(
    element,
    document.getElementById('tagline')
);