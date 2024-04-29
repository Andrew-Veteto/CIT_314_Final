import { useState } from 'react';
import './UserReview.css'

function UserReview({ park, text, review_id }) {

    var token = false;

    if (localStorage.getItem("_id")) {
        token = true;
    }

    const [showModal, setModal] = useState(false);

    function closeReviewModal() {
        document.getElementById('reviewTextArea').value = '';
        setModal(false);
    }

    function submitReview() {
        var reviewText = document.getElementById('reviewTextArea').value;
        const user_id = localStorage.getItem('_id');

        var requestBody = {
            review: reviewText,
            name: park,
            user_id: user_id,
            review_id: review_id
        };

        console.log(requestBody);

        fetch('http://localhost:8080/users/submit/review/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Handle success response here
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });

        closeReviewModal();
    }

    function deleteReview() {

        var requestBody = {
            name: park,
            review_id: review_id
        }

        fetch('http://localhost:8080/users/delete/review', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            })

    }

    return (
        <div>
            <div className="box">
                <p className='reviewHeader'>Park: <span id='parkName'>{park}</span> </p>
                <hr />
                <p className='reviewText'>{text}</p>
                <br />
                <hr />
                {token && <div className='review-btns'>
                    <button className='review-btn-btn' onClick={() => setModal(true)}>Edit</button>
                    <button className='review-btn-btn' onClick={() => deleteReview()}>Delete</button>
                </div>}
            </div>
            {showModal && <div id="reviewModal" className="reviewModal">
                <div className="reviewModal-content">
                    <div className='reviewModal-header'>
                        <span className="close" onClick={() => setModal(false)}>&times;</span>
                        <h2>Edit your Review</h2>
                        <span className="close invisible">&times;</span>
                    </div>
                    <div className='reviewModal-body'>
                        <textarea className='reviewModal-TextArea' id="reviewTextArea" rows="8" cols="50"></textarea>
                        <br />
                    </div>
                    <br />
                    <div className='reviewModal-btn'>
                        <button onClick={() => submitReview()} className='reviewModal-submit'>Submit</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UserReview;
