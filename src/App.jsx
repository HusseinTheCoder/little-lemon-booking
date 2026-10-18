
import { useState } from "react";
import "./App.css";

function App() {
    const [booking, setBooking] = useState({
        name: "",
        date: "",
        time: "",
        guests: "2",
        occasion: "None",
    });

    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState(null);

    const today = new Date().toLocaleDateString("en-CA");

    const availableTimes = [
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
    ];

    function handleChange(event) {
        const { name, value } = event.target;

        setBooking((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setConfirmation(null);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!booking.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!booking.date || booking.date < today) {
            setError("Please choose today or a future date.");
            return;
        }

        if (!booking.time) {
            setError("Please select a reservation time.");
            return;
        }

        const guests = Number(booking.guests);

        if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
            setError("Choose between 1 and 10 guests.");
            return;
        }

        setConfirmation({ ...booking });
        setError("");
    }

    return (
        <>
            <header className="header">
                <a className="logo" href="#home">
                    🍋 Little Lemon
                </a>

                <nav aria-label="Main navigation">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#booking">Reservations</a>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <div>
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>
                            Enjoy fresh Mediterranean food in a
                            welcoming restaurant.
                        </p>

                        <a className="button" href="#booking">
                            Reserve a Table
                        </a>
                    </div>
                </section>

                <section id="about" className="about">
                    <h2>Welcome to Little Lemon</h2>
                    <p>
                        Delicious food, friendly service, and
                        memorable dining experiences.
                    </p>
                </section>

                <section id="booking" className="booking">
                    <h2>Reserve Your Table</h2>
                    <p>Complete the form to request a reservation.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={booking.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="date">Choose date</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            min={today}
                            value={booking.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="time">Choose time</label>
                        <select
                            id="time"
                            name="time"
                            value={booking.time}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a time</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="guests">Number of guests</label>
                        <input
                            id="guests"
                            name="guests"
                            type="number"
                            min="1"
                            max="10"
                            step="1"
                            value={booking.guests}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="occasion">Occasion</label>
                        <select
                            id="occasion"
                            name="occasion"
                            value={booking.occasion}
                            onChange={handleChange}
                        >
                            <option value="None">No special occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                        </select>

                        {error && (
                            <p className="error" role="alert">
                                {error}
                            </p>
                        )}

                        <button type="submit">Confirm Reservation</button>
                    </form>

                    {confirmation && (
                        <section className="success" aria-live="polite">
                            <h3>Reservation request confirmed!</h3>
                            <p>Thank you, {confirmation.name}.</p>
                            <p>Date: {confirmation.date}</p>
                            <p>Time: {confirmation.time}</p>
                            <p>Guests: {confirmation.guests}</p>
                            <p>Occasion: {confirmation.occasion}</p>
                            <p>
                                <strong>Demo only:</strong> no real reservation
                                has been sent to the restaurant.
                            </p>
                        </section>
                    )}
                </section>
            </main>

            <footer>
                <p>© 2026 Little Lemon Restaurant</p>
            </footer>
        </>
    );
}

export default App;
