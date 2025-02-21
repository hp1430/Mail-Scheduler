import "./styles.css";
import { useState } from "react";

export const InputComponent = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const onClickHandler = async () => {
        try {
            const response = await fetch("http://13.61.196.242:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if(response.ok) {
                setSuccess(true);
                setEmail("");
            }
            else {
                setSuccess(false);
            }

            const data = await response.json();
            console.log("Response from backend:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Enter your e-mail id to subscribe</h1>

                <input 
                    type="text"
                    value={email}
                    placeholder="Enter your Email Id"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                
                <button
                    onClick={onClickHandler}
                    className="submit-btn"
                >
                    Submit
                </button>

                {success && <p className="success-message">Subscription successful!</p>}
                
            </div>
        </div>
    );
};
