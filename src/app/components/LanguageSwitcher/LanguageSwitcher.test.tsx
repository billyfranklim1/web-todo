import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './index';
import i18n from '../../../i18n/config';

jest.mock('../../../i18n/config', () => ({
  changeLanguage: jest.fn(),
  language: 'en',
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('loads initial language from localStorage', () => {
    localStorage.setItem('i18nextLng', 'pt');
    render(<LanguageSwitcher />);
    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt');
  });

  it('changes language on selection', () => {
    const { getByRole } = render(<LanguageSwitcher />);
    fireEvent.change(getByRole('combobox'), { target: { value: 'es' } });
    expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
    expect(localStorage.getItem('i18nextLng')).toBe('es');
  });

  it('renders options for each supported language', () => {
    const { getByText } = render(<LanguageSwitcher />);
    expect(getByText('EN')).toBeInTheDocument();
    expect(getByText('PT')).toBeInTheDocument();
    expect(getByText('ES')).toBeInTheDocument();
    expect(getByText('FR')).toBeInTheDocument();
  });
  
});
