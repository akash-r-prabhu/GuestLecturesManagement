import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import  LoginPage from './loginPage';

describe('LoginPage', () => {
  it('should login successfully', async () => {
    // Render the LoginPage component
    const { getByLabelText, getByText } = render(<LoginPage />);

    // Fill in the login form
    const emailInput = getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the login form
    fireEvent.click(getByText('LOGIN'));

    // Wait for the login process to complete
    await waitFor(() => {
      // Check if the success message is displayed
      expect(getByText('Login Successful')).toBeInTheDocument();
    });
  });

  it('should show error for invalid credentials', async () => {
    // Render the LoginPage component
    const { getByLabelText, getByText } = render(<LoginPage />);

    // Fill in the login form with invalid credentials
    const emailInput = getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });

    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });

    // Submit the login form
    fireEvent.click(getByText('LOGIN'));

    // Wait for the login process to complete
    await waitFor(() => {
      // Check if the error message is displayed
      expect(getByText('Invalid Credentials')).toBeInTheDocument();
    });
  });

  it('should register a new user', async () => {
    // Render the LoginPage component
    const { getByLabelText, getByText } = render(<LoginPage />);

    // Switch to the registration form
    fireEvent.click(getByText('SIGN UP'));

    // Fill in the registration form
    const nameInput = getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const studentRollNoInput = getByLabelText('Student Roll No:');
    fireEvent.change(studentRollNoInput, { target: { value: '123456' } });

    // Submit the registration form
    fireEvent.click(getByText('SIGN UP'));

    // Wait for the registration process to complete
    await waitFor(() => {
      // Check if the success message is displayed
      expect(getByText('Registration Successful')).toBeInTheDocument();
    });
  });
});
