import { useState } from 'react';
import '../UserReview/UserReview.css'

function UserReview({ park, text, review_id }) {

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
                <p style={{ 'fontSize': 'xl' }}>Park: <span id='parkName'>{park}</span> </p>
                <p>{text}</p>
                <div className='review-btns'>
                    <button onClick={() => setModal(true)}>Edit</button>
                    <button onClick={() => deleteReview()}>Delete</button>
                </div>
            </div>
            {showModal && <div id="reviewModal" className="reviewModal">
                <div className="reviewModal-content">
                    <div className='reviewModal-header'>
                        <span className="close" onClick={() => setModal(false)}>&times;</span>
                        <h2>Edit your Review</h2>
                        <span className="close invisible">&times;</span>
                    </div>
                    <div className='reviewModal-body'>
                        <textarea id="reviewTextArea" rows="4" cols="50"></textarea>
                        <br />
                    </div>
                    <button onClick={() => submitReview()} className='reviewModal-submit'>Submit</button>
                </div>
            </div>}
        </div>
    )
}

export default UserReview;
