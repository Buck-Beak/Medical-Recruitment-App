import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/fire";

const Feedback = ({recruiterId}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [satisfaction, setSatisfaction] = useState('');
  const [stress, setStress] = useState('');
  const [recommend, setRecommend] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleClick = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    // Create a feedback object with the collected data
    const feedbackData = {
      recruiterId: recruiterId,
      satisfaction: satisfaction,
      stress: stress,
      recommend: recommend,
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    };

    try {
      // Save feedback data to Firestore in the "feedback" collection
      const docRef = await addDoc(collection(db, "feedback"), feedbackData);
      console.log("Feedback submitted with ID: ", docRef.id);
      
      // Optionally, reset the form or provide a success message
      setSatisfaction('');
      setStress('');
      setRecommend('');
      setSuggestions('');
      setFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  }

  return (
    <div className="feed-back">
      <h1>FeedBack Form</h1>
      <button onClick={handleClick}>
        {isFormVisible ? "Hide Feedback Form" : "Show Feedback Form"}
      </button>
      
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <h2>Rate your overall work satisfaction</h2>
            <input type="radio" id="1" name="satisfaction" value="1" onChange={(e) => setSatisfaction(e.target.value)} />
            <label htmlFor="1">1</label>
            <input type="radio" id="2" name="satisfaction" value="2" onChange={(e) => setSatisfaction(e.target.value)} />
            <label htmlFor="2">2</label>
            <input type="radio" id="3" name="satisfaction" value="3" onChange={(e) => setSatisfaction(e.target.value)} />
            <label htmlFor="3">3</label>
            <input type="radio" id="4" name="satisfaction" value="4" onChange={(e) => setSatisfaction(e.target.value)} />
            <label htmlFor="4">4</label>
            <input type="radio" id="5" name="satisfaction" value="5" onChange={(e) => setSatisfaction(e.target.value)} />
            <label htmlFor="5">5</label>
          </div>
          <div className="input-field">
            <h2>Is your work environment stress-free</h2>
            <input type="radio" id="yes" name="stress" value="Yes" onChange={(e) => setStress(e.target.value)} />
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="satisfactory" name="stress" value="Satisfactory" onChange={(e) => setStress(e.target.value)} />
            <label htmlFor="satisfactory">Satisfactory</label>
            <input type="radio" id="no" name="stress" value="No" onChange={(e) => setStress(e.target.value)} />
            <label htmlFor="no">No</label>
          </div>
          <div className="input-field">
            <h2>How likely would you recommend our hospital to your friends or family members</h2>
            <input type="radio" id="extremely" name="recommend" value="Extremely Likely" onChange={(e) => setRecommend(e.target.value)} />
            <label htmlFor="extremely">Extremely Likely</label>
            <input type="radio" id="maybe" name="recommend" value="Maybe" onChange={(e) => setRecommend(e.target.value)} />
            <label htmlFor="maybe">Maybe</label>
            <input type="radio" id="notAtAll" name="recommend" value="Not at All" onChange={(e) => setRecommend(e.target.value)} />
            <label htmlFor="notAtAll">Not at All</label>
          </div>
          <div className="input-field">
            <label className="text-area">Suggestions for improvement</label>
            <textarea value={suggestions} onChange={(e) => setSuggestions(e.target.value)}></textarea>
          </div>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
