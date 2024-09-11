// BookingForm.js
import React, { useState } from 'react';

const validateForm = (name, date, time, guests) => {
    const errors = {};

    if (!name) {
        errors.name = 'Name is required';
    }

    const today = new Date();
    const bookingDate = new Date(date);
    if (isNaN(bookingDate) || bookingDate <= today) {
        errors.date = 'Date must be a valid future date';
    }

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(time)) {
        errors.time = 'Time must be in HH:MM format';
    }

    if (isNaN(guests) || guests <= 0) {
        errors.guests = 'Number of guests must be a positive integer';
    }

    return errors;
};

const BookingForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        date: '',
        time: '',
        guests: '',
        errors: {}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, date, time, guests } = formState;
        const errors = validateForm(name, date, time, guests);

        if (Object.keys(errors).length === 0) {
            // Proceed with form submission
            console.log('Form submitted');
        } else {
            setFormState(prevState => ({ ...prevState, errors }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formState.name} onChange={handleChange} />
                {formState.errors.name && <span>{formState.errors.name}</span>}
            </label>
            <label>
                Date:
                <input type="date" name="date" value={formState.date} onChange={handleChange} />
                {formState.errors.date && <span>{formState.errors.date}</span>}
            </label>
            <label>
                Time:
                <input type="text" name="time" value={formState.time} onChange={handleChange} />
                {formState.errors.time && <span>{formState.errors.time}</span>}
            </label>
            <label>
                Number of Guests:
                <input type="number" name="guests" value={formState.guests} onChange={handleChange} />
                {formState.errors.guests && <span>{formState.errors.guests}</span>}
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookingForm;
