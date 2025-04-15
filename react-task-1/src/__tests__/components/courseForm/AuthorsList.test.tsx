import { render, screen } from '@testing-library/react';
import { AuthListItemType } from '../../../types/types';
import { vi } from 'vitest';
import AuthorsList from '../../../components/courseForm/AuthorsList';

vi.mock('../../../components/ui/renderElements/AuthListItem', () => ({
  __esModule: true,
  default: vi.fn(() => <li>Mocked AuthListItem</li>),
}));

describe('AuthorsList component', () => {
  const authListMock = [
    { id: '1', name: 'Author 1' },
    { id: '2', name: 'Author 2' },
  ];

  const defaultProps: AuthListItemType = {
    title: 'Test Authors List',
    authList: authListMock,
    selects: true,
  };

  beforeEach(() => {
    render(<AuthorsList {...defaultProps} />);
  });

  it('should render the title correctly', () => {
    const title = screen.getByText('Test Authors List');
    expect(title).toBeInTheDocument();
  });

  it('should render the correct number of authors', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(authListMock.length);
  });

  it('should render AuthListItem for each author', () => {
    const authListItems = screen.getAllByText('Mocked AuthListItem');
    expect(authListItems.length).toBe(authListMock.length);
  });

  it('should not render anything if authList is empty', () => {
    const propsWithEmptyList = { ...defaultProps, authList: [] };

    const { container } = render(<AuthorsList {...propsWithEmptyList} />);
    const list = container.querySelector('ul');
    expect(list).toBeEmptyDOMElement();
  });

  it('should not render anything if authList is not passed', () => {
    const propsWithoutAuthList = { ...defaultProps, authList: undefined };

    const { container } = render(<AuthorsList {...propsWithoutAuthList} />);
    expect(container).toBeEmptyDOMElement();
  });
});
