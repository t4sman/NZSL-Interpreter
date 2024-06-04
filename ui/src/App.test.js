import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import HelpBtn from './helpBtn/HelpBtn';

test('renders the App with HelpBtn', () => {
  render(<App />);
  const questionMark = screen.getByText('?');
  expect(questionMark).toBeInTheDocument();
});

test('does not show the tooltip text initially', () => {
  render(<App />);
  const tooltipText = screen.queryByText("Need help? try turning on the camera and start signing! Its as simple as that, if you're still unsure navigate to the Tutorial page.");
  expect(tooltipText).not.toBeInTheDocument();
});

test('shows the tooltip text on mouse hover', () => {
  render(<App />);
  const questionMark = screen.getByText('?');
  fireEvent.mouseEnter(questionMark);
  const tooltipText = screen.getByText("Need help? try turning on the camera and start signing! Its as simple as that");
  expect(tooltipText).toBeInTheDocument();
});

test('hides the tooltip text when mouse leaves', () => {
  render(<App />);
  const questionMark = screen.getByText('?');
  fireEvent.mouseEnter(questionMark);
  fireEvent.mouseLeave(questionMark);
  const tooltipText = screen.queryByText("Need help? try turning on the camera and start signing! Its as simple as that");
  expect(tooltipText).not.toBeInTheDocument();
});
