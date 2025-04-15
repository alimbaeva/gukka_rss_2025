import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/modal/Modal';

vi.mock('@/shared/hooks/useSearch', () => ({
  useSearch: vi.fn().mockReturnValue({
    userData: { name: 'Test User', avatar: '/avatar.png' },
    setUserData: vi.fn(),
  }),
}));

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when close icon is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when background is clicked', () => {
    const onCloseMock = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Modal content</p>
      </Modal>
    );

    const wrapper = container.querySelector('.modal-wrapper');
    if (wrapper) {
      fireEvent.click(wrapper);
    }

    expect(onCloseMock).toHaveBeenCalled();
  });
});
