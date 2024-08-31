import { useEffect, useState } from "react";
import { cvdb } from "../firebase/fire";
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { v4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Apply = () => {
    const [cv, setCV] = useState(null);
    const [cvURL, setCvURL] = useState([]);
    const { user } = UserAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const cvListRef = ref(cvdb, "cv/");

    const handleClick = async () => {
        if (!cv) return;

        const timestamp = new Date().toISOString();
        const cvRef = ref(cvdb, `cv/${cv.name}_${timestamp}_${v4()}`);
        
        try {
            const snapshot = await uploadBytes(cvRef, cv);
            const url = await getDownloadURL(snapshot.ref);

            // Fetch the updated list of CVs including the newly uploaded one
            const response = await listAll(cvListRef);
            const urlsWithTimestamps = await Promise.all(response.items.map(async (item) => {
                const itemRef = ref(cvdb, item.fullPath); // Create a reference for the item
                const metadata = await getMetadata(itemRef); // Get metadata for the reference
                const url = await getDownloadURL(itemRef); // Get URL for the reference
                return { url, timestamp: metadata.timeCreated }; // Assuming timeCreated is available
            }));

            // Sort by timestamp and get the most recent one
            urlsWithTimestamps.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setCvURL([urlsWithTimestamps[0].url]);

            alert("Application submitted successfully");
            navigate('/');
        } catch (error) {
            console.error("Error uploading CV: ", error);
            alert("Failed to upload CV");
        }
    };

    useEffect(() => {
        const fetchCvList = async () => {
            try {
                const response = await listAll(cvListRef);
                const urlsWithTimestamps = await Promise.all(response.items.map(async (item) => {
                    const itemRef = ref(cvdb, item.fullPath); // Create a reference for the item
                    const metadata = await getMetadata(itemRef); // Get metadata for the reference
                    const url = await getDownloadURL(itemRef); // Get URL for the reference
                    return { url, timestamp: metadata.timeCreated }; // Assuming timeCreated is available
                }));

                // Sort by timestamp and set the most recent one
                urlsWithTimestamps.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setCvURL([urlsWithTimestamps[0].url]);
            } catch (error) {
                console.error("Error fetching CV list: ", error);
            }
        };

        fetchCvList();
    }, []);

    return (
        <div className="apply">
            <label>Upload Resume:</label>
            <input 
                type="file" 
                onChange={(e) => {
                    setCV(e.target.files[0]);
                }} 
            />
            <button onClick={handleClick}>Apply</button>
            {cvURL.length > 0 && (
                <div>
                    <a href={cvURL[0]} target="_blank" rel="noopener noreferrer">
                        View/Download Most Recent Document
                    </a>
                </div>
            )}
        </div>
    );
};

export default Apply;
