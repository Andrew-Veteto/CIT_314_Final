import { useState } from 'react';
import '../UserReview/UserReview.css'

function UserReview({ park, text, review_id }) {

    const [showModal, setModal] = useState(false);

    // function showReviewModal() {
    //     document.getElementById("reviewModal").style.display = "block";
    //     document.getElementById('reviewTextArea').value = text;
    //     setCurrentPark(park);
    //     setCurrentReviewId(review_id);
    //     console.log(currentPark);
    // }

    function closeReviewModal() {
        document.getElementById('reviewTextArea').value = '';
        // document.getElementById("reviewModal").style.display = "none";
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
                // window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });

        closeReviewModal();
    }

    return (
        <div>
            <div className="box">
                <p style={{ 'fontSize': 'xl' }}>Park: <span id='parkName'>{park}</span> </p>
                <p>{text}</p>
                <button onClick={() => setModal(true)}>Edit</button>
            </div>
            {showModal && <div id="reviewModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setModal(false)}>&times;</span>
                    <h2>Edit your Review</h2>
                    <textarea id="reviewTextArea" rows="4" cols="50"></textarea>
                    <br />
                    <button onClick={() => submitReview()}>Submit</button>
                </div>
            </div>}
        </div>
    )
}

export default UserReview;