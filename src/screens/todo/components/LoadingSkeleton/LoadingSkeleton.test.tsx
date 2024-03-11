import React from 'react';
import { render } from '@testing-library/react';
import LoadingSkeleton from './index';

jest.mock('react-loading-skeleton', () => {
  return jest.fn(({ width, height, circle }) => (
    <div data-testid="skeleton" data-width={width} data-height={height} data-circle={circle ? 'true' : 'false'}></div>
  ));
});

describe('LoadingSkeleton', () => {
  it('renders five skeleton loaders', () => {
    const { getAllByTestId } = render(<LoadingSkeleton />);
    const skeletons = getAllByTestId('skeleton');
    expect(skeletons.length).toBe(25);
  });

  it('renders skeletons with correct properties', () => {
    render(<LoadingSkeleton />);
    const skeletons = document.querySelectorAll('[data-testid="skeleton"]');
    
    skeletons.forEach(skeleton => {
      expect(skeleton.getAttribute('data-circle')).toMatch(/true|false/);
      expect(skeleton).toHaveAttribute('data-width');
      expect(skeleton).toHaveAttribute('data-height');
    });
  });
});
