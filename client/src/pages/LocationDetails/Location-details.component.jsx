import CommentCard from '../../component/CommentCard/CommentCard.component'
import './location-details.styles.css'
import { LocationContext } from '../../contexts/locationdetail.context'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditContext } from '../../contexts/edit.context'
import EditForm from '../../component/EditForm/EditForm.component'

const LocationDetail = () => {
  const { selectedlocation, setSelectedLocation } = useContext(LocationContext)
  const { isEdit, setIsEdit, comment, setComment } = useContext(EditContext)
  const { address, description, images, price, host, Comments } =
    selectedlocation

  console.log(Comments)
  const add = address.split(',')

  const openEdit = (comment) => {
    setIsEdit(true)
    setComment(comment)
  }

  return (
    <div className={`location-main-container ${isEdit ? 'active' : ''}`}>
      <h1>title</h1>
      <h2>{`${add[1]},  ${add[2]}`}</h2>
      <div className="location-img-main-container">
        {images.map((img, index) => (
          <div
            className={`img-container ${index % 10 === 0 ? 'big' : 'small'}`}
          >
            <img src={img} />
          </div>
        ))}
      </div>
      <h3> Hosted by {host.lastName}</h3>
      <h3>{`$ ${price}  per night`}</h3>
      <p>{description}</p>
      <h3>Reviews... </h3>
      <button>Leave a comment</button>
      <div className="review-main-container">
        {Comments.map((comment, index) => (
          <div key={index} className="review-container">
            <div onClick={() => openEdit(comment)}>
              <i class="fas fa-edit edit-icon"></i>
            </div>
            <h5> likes : {comment.likes}</h5>

            {`comment: ${comment.content}`}
          </div>
        ))}
      </div>
      {isEdit && <EditForm />}
    </div>
  )
}

export default LocationDetail
