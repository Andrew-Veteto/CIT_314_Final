import './Review.css'

function Review({ username, text}) {
    return(
        <div className="box">
            <p className='reviewHeader'>User: {username}</p>
            <p className='reviewText' >{text}</p>
        </div>
    )
}

export default Review;