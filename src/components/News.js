import React from 'react'
import './news.css'
import {ThemeContext} from '../Theme'

function News() {

    const ThemeData = React.useContext(ThemeContext);

    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        if(!state.length){
            fetch('https://saurav.tech/NewsAPI/everything/cnn.json')
            .then((res) => res.json())
            .then(data => {
                if(data.articles && data.articles.length){
                    setState(data.articles);
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
        }
    },[state])

  return (
    <div className={ThemeData.theme ? 'feeds-wrapper' : 'feeds-wrapper dark-theme'}>
        <p className={ThemeData.theme ? 'heading' : 'heading InWhite'}>currently you are using {ThemeData.theme ? '<Light>' : '<Dark>'} theme.</p>
        {
            loading === false && state.length ? 
            <ul className='feeds-list'>
                {
                state.map((item, index) => {
                    return (
                    <li key={index}>
                        <div className='card'>
                            <img src={item.urlToImage}/>
                            <p className='card-title'>
                            {item.author ? item.author : 'Unknown source'}
                            </p>
                            <p className='card-description'>{item.description}</p>
                        </div>
                    </li>
                    )
                })
                }
            </ul>
            : loading && !state.length ?
                <p className='feeds-loader'>Loading please wait....</p>
            : "No data available, Try again later"
        }
    </div>
  )
}

export default News