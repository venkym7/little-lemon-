// BookingForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Validation', () => {
    test('should display error if name is empty', () => {
        render(<BookingForm />);
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    test('should display error if date is not in the future', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        render(<BookingForm />);
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: pastDate.toISOString().split('T')[0] } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(screen.getByText(/date must be a valid future date/i)).toBeInTheDocument();
    });

    test('should display error if time is not in HH:MM format', () => {
        render(<BookingForm />);
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '25:00' } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(screen.getByText(/time must be in hh:mm format/i)).toBeInTheDocument();
    });

    test('should display error if number of guests is not a positive integer', () => {
        render(<BookingForm />);
        fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '-5' } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(screen.getByText(/number of guests must be a positive integer/i)).toBeInTheDocument();
    });

    test('should not display errors if form is valid', () => {
        render(<BookingForm />);
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '14:00' } });
        fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '4' } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/date must be a valid future date/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/time must be in hh:mm format/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/number of guests must be a positive integer/i)).not.toBeInTheDocument();
    });
});
