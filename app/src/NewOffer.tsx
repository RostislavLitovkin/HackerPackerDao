import { ChangeEvent, FormEvent, useState } from "react";
import { Connect } from "./components/Connect";

import "./NewOffer.css"

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

    const [values, setValues] = useState<FormValues>({
        title: '',
        event: '',
        from_date: '',
        till_date: '',
        location: '',
        description: '',
        stake: 0,
      });
    
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
    
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values);
      };

    return (
        <>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <Connect />
                    <h1>Hacker Packer Dao</h1>

                    <div style={{fontWeight: 900}}>Offer / Ask</div>
                    <br />
                    <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={values.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="input"
                        type="text"
                        name="event"
                        placeholder="Event"
                        value={values.event}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="input"
                        type="date"
                        name="from_date"
                        placeholder="From"
                        value={values.from_date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="input"
                        type="date"
                        name="till_date"
                        placeholder="Till"
                        value={values.till_date}
                        onChange={handleChange}
                        required
                    />
                     <input
                        className="input"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={values.location}
                        onChange={handleChange}
                        required
                    />
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

                    <input
                        className="input"
                        type="number"
                        name="stake"
                        placeholder="Stake amount"
                        value={values.stake}
                        onChange={handleChange}
                        required
                    />

                    <button className="button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}