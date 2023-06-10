import "./OfferDetail.css"
import HorizontalBar from "./components/HorizontalBar";

function convertDateRangeFormat(fromDate: string, tillDate: string): string {
    const fromParts = fromDate.split('-');
    const tillParts = tillDate.split('-');

    if (fromParts.length !== 3 || tillParts.length !== 3) {
        throw new Error('Invalid date format. Expected format is dd-mm-yyyy.');
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const fromMonthName = monthNames[parseInt(fromParts[1], 10) - 1];
    const tillMonthName = monthNames[parseInt(tillParts[1], 10) - 1];

    // Compare year and month. If they're the same, just return the day range, else return full dates
    if (fromParts[1] === tillParts[1] && fromParts[2] === tillParts[2]) {
        return `${fromParts[0]}. - ${tillParts[0]}. ${tillMonthName} ${tillParts[2]}.`;
    } else {
        return `${fromParts[0]}. ${fromMonthName} ${fromParts[2]}. - ${tillParts[0]}. ${tillMonthName} ${tillParts[2]}.`;
    }
}

export function OfferDetail() {
    const title = "Highschool student looking for a place to stay"
    const event = "ETHPrague"

    const from_date = "09-06-2023"
    const till_date = "11-06-2023"

    const location = "Prague, Czechia"

    const description = "I do not know what to write here, maybe I should have let chat gpt generate something better for me instead. Please do not let AI replace me."

    // Other info:

    const askerscomment = "I do not know what to write here, maybe I should have let chat gpt generate something better for me instead. Please do not let AI replace me."

    const offererscomment = "I do not know what to write here, maybe I should have let chat gpt generate something better for me instead. Please do not let AI replace me."


    const offerersstake = 3.0;

    const askersstake = 1.0;



    return (
        <>
            <div className="container">
                <div className="card">


                    <div style={{
                        display: "flex",

                    }}>
                        <div style={{
                            minHeight: "150px",
                            minWidth: "240px"
                        }}>
                            <h1>{event}</h1>
                            <div>{convertDateRangeFormat(from_date, till_date)}</div>
                            <div>{location}</div>
                        </div>
                        <div>
                            <h1>{title}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                    <hr style={{
                        width: "90%", height: "2px", color: "black", backgroundColor: "black", borderRadius: "1px",
                        marginLeft: "auto", marginRight: "auto"
                    }}></hr>
                    <div className="asker-offerer-comment-grid">
                        <div className="comment">
                            <h1>Asker's comments</h1>
                            <p>
                                {askerscomment}
                            </p>
                            <br></br>
                            <b>
                                <div>Stake:</div>
                                <div>{askersstake} ETH</div>
                            </b>
                        </div>
                        <div className="comment">
                            <h1>Offerer's comments</h1>
                            <p>
                                {offererscomment}
                            </p>
                            <br></br>
                            <b>
                                <div>Stake:</div>
                                <div>{offerersstake} ETH</div>
                            </b>

                        </div>

                    </div>

                    <br></br>
                    <br></br>
                    <div style={{display: "flex", marginLeft: "30px", marginRight: "30px"}}>
                        <button className="agree-button">Agree</button>
                        <HorizontalBar value1={askersstake} value2={offerersstake} />
                        <button className="agree-button">Disagree</button>
                    </div>
                    
                    <br></br>
                </div>
            </div>
        </>
    )
}