import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from 'axios';
import UserReview from '../../components/UserReview/UserReview';
import { nanoid } from 'nanoid';
import './ProfilePage.css'

function ProfilePage() {

    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const _id = localStorage.getItem('_id') ? localStorage.getItem('_id').replace(/^"(.*)"$/, '$1') : null;

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/reviews/${_id}`);
                const user = await axios.get(`http://localhost:8080/users/user/${_id}`);
                setReviews(() => [...response.data]);
                setUsers(() => [...user.data]);
                setLoading(false);
            } catch (error) {
                // console.log(error);
            }
        }
        loadReviews();
    }, [_id])

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to='/login' />;
    }

    console.log(reviews);

    const reviewList = reviews.map((review) => (
        <UserReview
            key={nanoid()}
            park={review.park_name}
            text={review.review}
            review_id={review.review_id}
        />
    ))

    return (
        <div>
            <div>
                <Header />
            </div>
            <br />
            <div className="container">
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <h3>Hello {users[0].username}!</h3>
                            <h5>Amount of reviews: {reviews.length}</h5>
                        </div>
                    )}
                </div>
                <hr />
                <div>
                    <h4>Your reviews: </h4>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        reviewList
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;