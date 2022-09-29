import React from 'react';


class MovieTable extends React.Component {

    constructor( props ){
        super(props)
        this.state = {
            list:[],
            searchString: ''
        }
        this.callAPI = this.callAPI.bind(this);
        this.callAPI();
    }
    
    callAPI(){
        fetch("http://localhost:44343/api/movies").then(
            (response) => response.json()
        ).then((data) => {
            console.log(data);
            this.setState({
                list: data
            })
        })
    }
    callAPISearch = (e) => {
        fetch(`http://localhost:44343/api/movies?searchString=${encodeURIComponent(this.state.searchString)}` ).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({
                list: data
            })
        })
    }

    handleChange = (e) => {
        this.setState({ searchString: e.target.value });
    }

    render(){
        let tb_data = this.state.list.map(item => {
            return (
                <tr key={item.Id}>
                    <td>{item.OriginalTitle}</td>
                    <td>{item.ReleaseDate}</td>
                    <td>{item.Genres.map(genre => {
                           return (
                            <li>{genre.Name}</li>
                           )
                        })}
                    </td>
                    {/* added slice just for UI experience */}
                    <td>{item.Actors.slice(0,5).map(actor => {
                           return (
                            <li key="">{actor.Name}</li>
                           )
                        })}
                    </td>
                    <td>{item.Directors.map(director => {
                           return (
                            <li>{director.Name}</li>
                           )
                        })}
                    </td>
                </tr>
            )
        })
        return(
           
            <div class="container">
                 <div class="row">
                  <h2>Movie list</h2>
                </div>
                <div class="row">
                    <div className="col-6">
                        <div class="col-auto">
                            <label for="inputPassword2" class="visually-hidden">Password</label>
                            <input type="text" class="form-control" placeholder="Search by title" value={this.state.searchString} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <button type="button" class="btn btn-primary mb-3" onClick={this.callAPISearch}>Search</button>
                    </div>  
                </div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <th>Original Title</th>
                            <th>Release Date</th>
                            <th>Genres</th>
                            <th>Actors</th>
                            <th>Directors</th>
                        </thead>
                        <tbody>
                            {tb_data}
                        </tbody> 
                    </table>

            </div>
        )
    }
}
export default MovieTable;