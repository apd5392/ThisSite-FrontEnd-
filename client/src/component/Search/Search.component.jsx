import PlacesAutocomplete from 'react-places-autocomplete'
import scriptLoader from 'react-async-script-loader'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'react-date-range'

import { ReserveContext } from '../../contexts/reserve.context'
import { SearchResultContext } from '../../contexts/searchresult.context'
import axios from 'axios'
import './search.styles.css'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
const defaultSearchLocation = {
  cityandstate: '',
  start_date: new Date(),
  end_date: new Date()
}
const Search = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const { numberOfGuest, setnumberOfGuest, dateRange, setDateRange } =
    useContext(ReserveContext)
  const { searchResult, setSearchResult } = useContext(SearchResultContext)
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [openCal, SetOpenCal] = useState(false)
  const [openheadCounts, SetheadCounts] = useState(false)
  const [headCounts, setHeadCounts] = useState({
    adult: 0,
    children: 0,
    infants: 0
  })
  const [searchLocation, setsearchLocation] = useState(defaultSearchLocation)

  const navigate = useNavigate()
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }
  const searchOptions = {
    types: ['(cities)'],
    componentRestrictions: { country: 'us' }
  }
  const selectDateRange = (ranges) => {
    setStartDate(ranges.selection.startDate)
    // console.log(ranges.selection)
    setEndDate(ranges.selection.endDate)
  }

  const handleChange = (value) => {
    console.log(value)
    setAddress(value)
  }

  console.log(address)

  const handleSelect = (value) => {
    setAddress(value)
  }

  const toggleCal = () => {
    SetOpenCal(!openCal)
  }
  const toggleHeadCounts = () => {
    SetheadCounts(!openheadCounts)
  }

  const decrement = (type, operation) => {
    if (headCounts.infants >= 0 && headCounts.infants < 2) {
      setHeadCounts({
        ...headCounts,
        [type]:
          operation === 'd' ? (headCounts[type] -= 1) : (headCounts[type] += 1)
      })
    }
  }

  const handleSubmitSearch = async () => {
    console.log(`in the submit search ${address}`)

    setsearchLocation({
      cityandstate: address,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0]
    })
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/location/search`,
      {
        cityandstate: address,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      }
    )
    const searchResult = await result.data

    setSearchResult(searchResult)

    setDateRange({
      startDate: startDate,
      endDate: endDate
    })
    setnumberOfGuest({ ...headCounts })
    navigate(`/searchresults`)
  }

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div className="search-container">
        <div className="where-container">
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <label>Where:</label>
                <input
                  className="searchbox"
                  {...getInputProps({
                    placeholder: 'Search Destinations',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' }
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className={`checkin-container ${openCal ? 'active' : ''} `}>
          <label>When:</label>
          <span
            onClick={toggleCal}
          >{`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}</span>
          {openCal && (
            <div className="date-calender-container">
              <DateRangePicker
                className="date-calender"
                ranges={[selectionRange]}
                onChange={selectDateRange}
              />
            </div>
          )}
        </div>
        <div className="addGuest-container" onClick={toggleHeadCounts}>
          <span>
            {`Adult: ${headCounts.adult} Children: ${headCounts.children} Infants: ${headCounts.infants}`}
          </span>
        </div>
        {openheadCounts && (
          <div className="dropdown-menu">
            <div className="panel">
              <span>Adult</span>
              <div className="btn-box">
                <button
                  className="btns"
                  onClick={() => decrement('adult', 'd')}
                  disabled={headCounts.adult <= 0 ? 'true' : ''}
                >
                  -
                </button>
                <span className="number">{headCounts.adult}</span>
                <button
                  className="btns"
                  onClick={() => decrement('adult', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="panel">
              <span>Children</span>
              <div className="btn-box">
                <button
                  className="btns"
                  onClick={() => decrement('children', 'd')}
                  disabled={headCounts.children <= 0 ? 'true' : ''}
                >
                  -
                </button>
                <span className="number">{headCounts.children}</span>
                <button
                  className="btns"
                  onClick={() => decrement('children', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="panel">
              <span>Infants</span>
              <div className="btn-box">
                <button
                  className="btns"
                  onClick={() => decrement('infants', 'd')}
                  disabled={headCounts.infants <= 0 ? 'true' : ''}
                >
                  -
                </button>
                <span className="number">{headCounts.infants}</span>
                <button
                  className="btns"
                  onClick={() => decrement('infants', 'i')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="searchButton" onClick={handleSubmitSearch}>
          Search
        </button>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
])(Search)
