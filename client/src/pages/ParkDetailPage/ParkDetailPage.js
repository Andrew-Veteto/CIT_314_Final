import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import './ParkDetailPage.css'
import Review from '../../components/Review/Review';
import { nanoid } from "nanoid";

function ParkDetailPage() {

    const params = useParams();
    const [park, setPark] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [parkLoading, setParkLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    // Gets the park data
    useEffect(() => {
        const loadInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/park/${params.name}`);
                setPark(response.data);
                setParkLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        loadInfo();
    }, [params.name])

    // Gets all reviews for that park
    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reviews/${params.name}`);
                setReviews(response.data);
                setReviewsLoading(false);
            } catch (error) {
                console.log('Error fetching reviews:', error);
            }
        };
        loadReviews();
    }, [params.name]);

    const reviewList = reviews.map((review) => (
        <Review
            key={nanoid()}
            username={review.username}
            text={review.review}
        />
    ));

    function showReviewModal() {
        if (!localStorage.getItem('accessToken')) {
            alert("You must sign in first before leaving a review.");
        }else{
            document.getElementById("reviewModal").style.display = "block";
        }
    }

    function closeReviewModal() {
        document.getElementById('reviewTextArea').value = '';
        document.getElementById("reviewModal").style.display = "none";
    }

    function submitReview() {
        var reviewText = document.getElementById("reviewTextArea").value;
        const name = park[0].Park_Name;
        const user_id = localStorage.getItem('_id');

        const requestBody = {
            review: reviewText,
            name: name,
            user_id: user_id
        };

        console.log(requestBody);

        fetch('http://localhost:8080/users/submit/review', {
            method: 'POST',
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

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="container">
                {parkLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h3>{park[0].Park_Name}</h3>
                        <div className="field">
                            <label htmlFor="address">Address: </label>
                            <span>{park[0].Address}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Roller Coasters: </label>
                            <span>{park[0].Roller_Coasters}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Thrill Rides: </label>
                            <span>{park[0].Flat_Rides}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Water Rides: </label>
                            <span>{park[0].Water_Rides}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Water Park: </label>
                            <span>{park[0].Water_Park === 1 ? 'True' : 'False'}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Kid Area: </label>
                            <span>{park[0].Kid_Park === 1 ? 'True' : 'False'}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">In Park Food: </label>
                            <span>{park[0].Food === 1 ? 'True' : 'False'}</span>
                        </div>
                        <div className="field">
                            <label htmlFor="address">Family Accommodations: </label>
                            <span>{park[0].Family_Accommodations === 1 ? 'True' : 'False'}</span>
                        </div>
                    </div>
                )}
            </div>
            <hr />
            <div className="container">
                {reviewsLoading ? (
                    <p>Loading reviews...</p>
                ) : (
                    <div>
                        <div className="review_header">
                            <h4>Reviews: </h4>
                            <button onClick={showReviewModal}>Add a review</button>
                        </div>
                        <br />
                        {reviewList.length > 0 ? (
                            <div>
                                {reviewList}
                            </div>
                        ) : (
                            <p>No reviews available.</p>
                        )}
                    </div>
                )}
            </div>
            <div id="reviewModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeReviewModal}>&times;</span>
                    <h2>Write a Review</h2>
                    <textarea id="reviewTextArea" rows="4" cols="50"></textarea>
                    <br />
                    <button onClick={submitReview}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ParkDetailPage;
