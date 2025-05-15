import { FC } from 'react';

interface ClassificationBadgeProps {
  classification: string;
}

const ClassificationBadge: FC<ClassificationBadgeProps> = ({ classification }) => {
  const getColor = () => {
    switch (classification) {
      case '1st':
        return 'bg-red-500 text-white';
      case '2:1':
        return 'bg-blue-500 text-white';
      case '2:2':
        return 'bg-green-500 text-white';
      case '3rd':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`${getColor()} rounded-lg p-4 text-center text-2xl font-bold`}>
      {classification} Class Honours
    </div>
  );
};

export default ClassificationBadge;