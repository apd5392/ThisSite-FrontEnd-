import Search from '../component/Search/Search.component'
import CardSlider from '../component/Slider/Slider.component'
import LocationCard from '../component/LocationCard/LocationCard.component'
import CommentCard from '../component/CommentCard/CommentCard.component'
import './Home.styles.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import CardSlider2 from '../component/Slider/Slider.component2'
import { EditContext } from '../contexts/edit.context'

const Home = () => {
  const [locations, setLocations] = useState([])
  const { editcomment } = useContext(EditContext)

  useEffect(() => {
    const getLocations = async () => {
      const locations = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/location`
      )

      setLocations(locations.data)
    }
    getLocations()
  }, [])

  return (
    <div className="Home-container">
      <h1>Find places to stay on .ThisSite</h1>
      <p>Discover entire homes and private rooms perfect for any trip.</p>
      <Search />
      <div className="home-img-container">
        <div className="imgLeft">
          <img src="https://i.imgur.com/rE2ctjK.jpg" />
        </div>
        <div className="imgTopRight">
          <img src="https://i.imgur.com/l1pO5V5.jpg" />
        </div>
        <div className="imgBottomRight">
          <img src="https://i.imgur.com/3zQz9qj.jpg" />
        </div>
      </div>

      <CardSlider locationCard={LocationCard} Locations={locations} />
      <CardSlider2 commentCard={CommentCard} Locations={locations} />
    </div>
  )
}

export default Home
