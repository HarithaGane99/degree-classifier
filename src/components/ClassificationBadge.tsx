import { FC } from 'react';
import '../styles/main.css'; // Make sure this path is correct

interface ClassificationBadgeProps {
  classification: string;
}

const ClassificationBadge: FC<ClassificationBadgeProps> = ({ classification }) => {
  const getBadgeClass = () => {
    switch (classification) {
      case '1st':
        return 'classification-badge-1st';
      case '2:1':
        return 'classification-badge-2i';
      case '2:2':
        return 'classification-badge-2ii';
      case '3rd':
        return 'classification-badge-3rd';
      default:
        return 'classification-badge-default';
    }
  };

  return (
    <div className={`classification-badge ${getBadgeClass()}`}>
      {classification} Class Honours
    </div>
  );
};

export default ClassificationBadge;