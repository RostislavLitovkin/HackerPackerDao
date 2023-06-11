import { ChangeEvent, FormEvent, useState } from "react";

import "./NewOffer.css"
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Header } from "./components/Header";

import abi from "./abi/abi.json"
import { encodeAbiParameters } from 'viem'


function convertDateToUnixTimestamp(dateString: string): number {
    // Split the date string on "-"
    let dateParts = dateString.split("-");

    // JavaScript counts month from 0 to 11. January is 0. December is 11.
    let date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

    // Get the timestamp in seconds, rounding down to ignore milliseconds
    let timestamp = Math.floor(date.getTime() / 1000);

    return timestamp;
}

interface FormValues {
    title: string;
    event: string;
    from_date: string;
    till_date: string;
    location: string;
    description: string;
    stake: number;
}

export function NewOffer() {




    const { isConnected } = useAccount()

    const [values, setValues] = useState<FormValues>({
        title: '',
        event: '',
        from_date: '',
        till_date: '',
        location: '',
        description: '',
        stake: 0,
    });

    const encodedData1 = encodeAbiParameters(
        [
            { name: '_hostDeposit', type: 'uint256' },
        ],
        [0n]
    )
    const encodedData2 = encodeAbiParameters(
        [
            { name: '_guestDeposit', type: 'uint256' },
        ],
        [420n]
    )
    const encodedData3 = encodeAbiParameters(
        [
            { name: '_escrowEndTimestamp', type: 'uint256' },
            
        ],
        [1696466851n]
    )
    const encodedData4 = encodeAbiParameters(
        [
            { name: "_metadata", type: "bytes" }
        ],
        ["0x"]
    )
    const { config } = usePrepareContractWrite({
        address: '0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a',
        abi,
        chainId: 137,
        args: [encodedData1, encodedData2, encodedData3, encodedData4],
        functionName: 'createEscrow',
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values);
        console.log(1696466851)

        write?.()
    };

    return (
        <>

            <div className="container">
                <Header />
                <form className="form" onSubmit={handleSubmit}>
                    <div style={{ fontWeight: 900 }}>Offer / Ask</div>
                    {isConnected ?
                        <>

                            <br />
                            Title:
                            <input
                                className="input"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                required
                            />
                            Event:
                            <input
                                className="input"
                                type="text"
                                name="event"
                                placeholder="Event"
                                value={values.event}
                                onChange={handleChange}
                                required
                            />
                            From:
                            <input
                                className="input"
                                type="date"
                                name="from_date"
                                placeholder="From"
                                value={values.from_date}
                                onChange={handleChange}
                                required
                            />
                            Till:
                            <input
                                className="input"
                                type="date"
                                name="till_date"
                                placeholder="Till"
                                value={values.till_date}
                                onChange={handleChange}
                                required
                            />
                            Location:
                            <input
                                className="input"
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={values.location}
                                onChange={handleChange}
                                required
                            />
                            Description:
                            <textarea
                                className="input"
                                name="description"
                                placeholder="Description"
                                value={values.description}
                                onChange={(event) => {
                                    setValues({ ...values, [event.target.name]: event.target.value });
                                }
                                }
                                required
                            />
                            Stake amount:
                            <input
                                className="input"
                                type="number"
                                name="stake"
                                placeholder="Stake amount"
                                value={values.stake}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </>
                        :
                        <div style={{ margin: "auto" }}>
                            Connect your wallet please
                        </div>}
                </form>
            </div>
        </>
    )
}