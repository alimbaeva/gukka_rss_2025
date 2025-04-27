import { ReactNode } from 'react';

type CourseInfoItemProps = {
  title: string;
  renderContent: () => ReactNode;
};

const CourseInfoItem = ({ title, renderContent }: CourseInfoItemProps) => (
  <p className="item">
    <span>{title}</span>
    <span className="sub-description">{renderContent()}</span>
  </p>
);

export default CourseInfoItem;
