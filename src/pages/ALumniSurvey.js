import React, { useState } from 'react';
import '../styles/AlumniSurvey.css';
import Navbar from '../components/Navbar';

const AlumniSurvey = () => {
    const [eventFormData, setEventFormData] = useState({
        satisfaction: '',
        comments: ''
    });

    const [universityFormData, setUniversityFormData] = useState({
        overallExperience: '',
        favoriteAspect: '',
        suggestions: ''
    });

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEventFormData({ ...eventFormData, [name]: value });
    };

    const handleUniversityChange = (e) => {
        const { name, value } = e.target;
        setUniversityFormData({ ...universityFormData, [name]: value });
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        alert('Event survey submitted successfully! Thank you for your feedback.');
        setEventFormData({ satisfaction: '', comments: '' });
    };

    const handleUniversitySubmit = (e) => {
        e.preventDefault();
        alert('University survey submitted successfully! Thank you for your feedback.');
        setUniversityFormData({ overallExperience: '', favoriteAspect: '', suggestions: '' });
    };

    return (
        <div className="alumnisurvey-homebox">
            <Navbar />

            <div className="alumnisurvey-container">
                <div className="alumnisurvey-content">
                    <h1>Alumni Event Satisfaction Survey</h1>
                    <p>We value your feedback! Please let us know your thoughts about our recent events.</p>
                    <form onSubmit={handleEventSubmit} className="alumnisurvey-form">
                        <label htmlFor="satisfaction">How satisfied were you with the event?</label>
                        <select
                            name="satisfaction"
                            id="satisfaction"
                            value={eventFormData.satisfaction}
                            onChange={handleEventChange}
                            required
                        >
                            <option value="">Select your satisfaction level</option>
                            <option value="Very Satisfied">Very Satisfied</option>
                            <option value="Satisfied">Satisfied</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Dissatisfied">Dissatisfied</option>
                            <option value="Very Dissatisfied">Very Dissatisfied</option>
                        </select>

                        <label htmlFor="comments">Do you have any comments or suggestions?</label>
                        <textarea
                            name="comments"
                            id="comments"
                            value={eventFormData.comments}
                            onChange={handleEventChange}
                            rows="4"
                            placeholder="Share your thoughts here..."
                        ></textarea>

                        <button type="submit" className="alumnisurvey-submit-btn">Submit Feedback</button>
                    </form>
                </div>

                <div className="alumnisurvey-content">
                    <h1>University Experience Survey</h1>
                    <p>Your opinion matters! Please provide your insights about your experience at UIC.</p>
                    <form onSubmit={handleUniversitySubmit} className="alumnisurvey-form">
                        <label htmlFor="overallExperience">How would you rate your overall experience at UIC?</label>
                        <select
                            name="overallExperience"
                            id="overallExperience"
                            value={universityFormData.overallExperience}
                            onChange={handleUniversityChange}
                            required
                        >
                            <option value="">Select a rating</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Average">Average</option>
                            <option value="Poor">Poor</option>
                            <option value="Very Poor">Very Poor</option>
                        </select>

                        <label htmlFor="favoriteAspect">What was your favorite aspect of your time at UIC?</label>
                        <input
                            type="text"
                            name="favoriteAspect"
                            id="favoriteAspect"
                            value={universityFormData.favoriteAspect}
                            onChange={handleUniversityChange}
                            placeholder="e.g., Faculty support, campus life, events"
                            required
                        />

                        <label htmlFor="suggestions">Do you have any suggestions for improving UIC?</label>
                        <textarea
                            name="suggestions"
                            id="suggestions"
                            value={universityFormData.suggestions}
                            onChange={handleUniversityChange}
                            rows="4"
                            placeholder="Share your thoughts here..."
                        ></textarea>

                        <button type="submit" className="alumnisurvey-submit-btn">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AlumniSurvey;