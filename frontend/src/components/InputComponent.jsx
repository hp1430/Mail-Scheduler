import "./styles.css";
import { useState } from "react";

export const InputComponent = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");

    const onClickHandler = async () => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if(response.ok) { 
                setSuccess("true");
                setEmail("");
            }
            else if(response.status === 400) {
                setSuccess("exist");
                setEmail("");
            }
            else if(response.status === 401) {
                setSuccess("invalid");
                setEmail("");
            }
            else {
                setSuccess("false");
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

                {success==="true" && <p className="success-message">Subscription successful!</p>}
                {success==="exist" && <p className="error-message">User already exists!</p>}
                {success==="false" && <p className="error-message">Subscription failed, Try again !</p>}
                {success==="invalid" && <p className="error-message">Invalid Email Id!</p>}
            </div>
        </div>
    );
};
