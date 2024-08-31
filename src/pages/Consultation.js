import { useState,useEffect } from "react";
import { createData,readAllData } from "../functions/crud";

const Consultation = () => {
    const [tips,setTips] = useState("");
    const [allTips, setAllTips] = useState([]);

    useEffect(() => {
        // Fetch all tips when the component mounts
        const fetchTips = async () => {
            try {
                const fetchedTips = await readAllData("self-relief-tips");
                setAllTips(fetchedTips);
            } catch (error) {
                console.error("Error fetching tips: ", error);
            }
        };

        fetchTips();
    }, []);

    const handleSubmit=async(e)=>{
        const data={tips};
        e.preventDefault();
        
        try {
            const collectionName = "self-relief-tips";
            await createData(collectionName, data);
            // Optionally, fetch updated tips
            const updatedTips = await readAllData("self-relief-tips");
            setAllTips(updatedTips);
            setTips(""); // Clear the input field
        } catch (error) {
            console.error("Error submitting tip: ", error);
        }
    }

    return ( 
        <div className="self-relief-tips">
            <h3>Share Your experiences and be a support to others!</h3>
            <form onSubmit={handleSubmit}>
                <label>Stress Relief Tip</label>
                <input type="text" onChange={(e) => {setTips(e.target.value);}}/>
                <button>Share</button>
            </form>
            <div className="tips-list">
                <h4>All Tips</h4>
                <div>
                    {allTips.map((tip, index) => (
                        <li key={index}>{tip.tips}</li> // Adjust based on the structure of your data
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Consultation;