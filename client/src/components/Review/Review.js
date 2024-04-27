import './Review.css'

function Review({ username, text}) {
    return(
        <div className="box">
            <p style={{'fontSize': 'xl'}}>User: {username}</p>
            <p>{text}</p>
        </div>
    )
}

export default Review;