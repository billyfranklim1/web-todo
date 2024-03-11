import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeSwitcher from './index';
import '@testing-library/jest-dom';

describe('DarkModeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders correctly with initial dark mode value from localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    const { getByRole } = render(<DarkModeSwitcher />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles dark mode on click', async () => {
    const { container } = render(<DarkModeSwitcher />);
    const switcher = container?.firstChild as Element;
    
    expect(localStorage.getItem('darkMode')).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    await userEvent.click(switcher);
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    await userEvent.click(switcher);
    expect(localStorage.getItem('darkMode')).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
